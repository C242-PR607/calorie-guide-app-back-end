const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const OTPHandler = require("../utils/otp");
const sendEmail = require("../utils/nodemailer");
const redisClient = require("../config/caching");
const { v4: uuidv4 } = require("uuid");
const JwtHandler = require("../utils/jwtHandler");
const DatabaseError = require("../exceptions/DatabaseError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const ValidationError = require("../exceptions/ValidationError");
const AuthorizationError = require("../exceptions/AuthorizationError");

class AuthService {
  static async register(userData) {
    const user = await UserModel.findByEmail(userData.email);

    if (user) throw new DatabaseError("User already exists");

    const otpKey = `otp:${userData.email}`;
    const userKey = `user:${userData.email}`;

    const existingOTP = await redisClient.ttl(otpKey);

    if (existingOTP > 480) {
      throw new DatabaseError("OTP already sent. If you have not received the OTP, please wait for 2 minutes.");
    }

    const otp = OTPHandler.generateOTP();
    const token = JwtHandler.generateToken({ email: userData.email, otp: otp });

    await redisClient.set(otpKey, token);
    await redisClient.expire(otpKey, 600);

    await redisClient.set(userKey, JSON.stringify({ email: userData.email, password: userData.password }));
    await redisClient.expire(userKey, 600);

    const html = `<h1>Account Verification</h1>
          <p>Dear ${userData.email},</p>
          <p>Your OTP code is <strong>${otp}</strong>. Please use this code to verify your account within the next 10 minutes.</p>
          <p>If you did not request this code, please ignore this email.</p>`;

    const emailContent = {
      to: userData.email,
      subject: "Account Verification",
      html: html,
    };

    await sendEmail(emailContent);

    const data = {
      email: userData.email,
      token: token,
    };

    return data;
  }

  static async verifyOTP(otp, email, storedOTP, sentToken) {
    const otpKey = `otp:${email}`;
    const storedToken = await redisClient.get(otpKey);

    if (!storedToken) throw new NotFoundError("OTP not found or expired");

    if (storedToken !== sentToken) throw new AuthenticationError("Invalid token");

    if (storedOTP !== otp) throw new ValidationError("Invalid OTP");

    await redisClient.del(otpKey);

    const userKey = `user:${email}`;
    const user = await redisClient.get(userKey);

    if (!user) {
      const resetTokenKey = `reset-token:${email}`;
      const token = JwtHandler.generateToken({ email: email });

      await redisClient.set(resetTokenKey, token);
      await redisClient.expire(resetTokenKey, 600);

      const data = {
        email: email,
        resetToken: token,
      };

      return data;
    }

    await UserModel.create(JSON.parse(user));

    await redisClient.del(userKey);

    const newUser = await UserModel.findByEmail(email);

    const token = JwtHandler.generateToken({ id: newUser.id, email: newUser.email });

    await UserModel.update({ token: token }, { id: newUser.id });

    const data = {
      id: uuidv4(),
      email: newUser.email,
      token: token,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };

    return data;
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new AuthenticationError("Invalid credentials");

    if (user.token !== null) throw new AuthorizationError("User already logged in");

    const token = JwtHandler.generateToken({ id: user.id, email: user.email });

    await UserModel.update({ token: token }, { id: user.id });

    const data = {
      id: uuidv4(),
      email: user.email,
      token: token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }

  static async logout(email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user?.token !== token) throw new AuthenticationError("Invalid token");

    await UserModel.update({ token: null }, { email: email });

    const updatedUser = await UserModel.findByEmail(email);

    const data = {
      id: uuidv4(),
      email: updatedUser.email,
      token: updatedUser.token,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return data;
  }

  static async forgotPassword(email) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token !== null) throw new AuthorizationError("User is logging in. Please logout first.");

    const key = `otp:${email}`;

    const existingOTP = await redisClient.ttl(key);

    if (existingOTP > 480) {
      throw new DatabaseError("OTP already sent. If you have not received the OTP, please wait for 2 minutes.");
    }

    const existingToken = await redisClient.get(`reset-token:${email}`);

    if (existingToken) {
      throw new DatabaseError("Reset password token already set within 10 minutes. Please try again later.");
    }

    const otp = OTPHandler.generateOTP();
    const token = JwtHandler.generateToken({ email: email, otp: otp });

    await redisClient.set(key, token);
    await redisClient.expire(key, 600);

    const html = `<h1>Reset Password</h1>
            <p>Dear ${email},</p>
            <p>Your OTP code is <strong>${otp}</strong>. Please use this code to reset your password within the next 10 minutes.</p>
            <p>If you did not request this code, please ignore this email.</p>`;

    const emailContent = {
      to: email,
      subject: "Reset Password",
      html: html,
    };

    await sendEmail(emailContent);

    const data = {
      email: email,
      token: token,
    };

    return data;
  }

  static async resetPassword(password, email, token) {
    const storedToken = await redisClient.get(`reset-token:${email}`);

    if (!storedToken) throw new NotFoundError("Reset password token not found or expired");

    if (storedToken !== token) throw new AuthenticationError("Invalid reset password token");

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.update({ password: hashedPassword }, { email: email });

    await redisClient.del(`reset-token:${email}`);

    const user = await UserModel.findByEmail(email);

    const data = {
      id: uuidv4(),
      email: user.email,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }
}

module.exports = AuthService;
