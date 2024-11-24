const ConflictException = require("../exceptions/conflict");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const OTPHandler = require("../utils/otp");
const sendEmail = require("../utils/nodemailer");
const redisClient = require("../config/redis");
const { v4: uuidv4 } = require("uuid");
const jwtHandler = require("../utils/jwtHandler");

class UserService {
  static async register(userData) {
    const user = await UserModel.findByEmail(userData.email);

    if (user) throw new ConflictException("Email already exists");

    const otp = OTPHandler.generateOTP();

    await OTPHandler.storeOTP(`otp:${userData.email}`, otp, `user:${userData.email}`, JSON.stringify({ email: userData.email, password: userData.password }), 600);

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
    };

    return data;
  }

  static async verifyOTP(user) {
    await UserModel.create(user);

    await redisClient.del(`user:${user.email}`);

    const newUser = await UserModel.findByEmail(user.email);

    const token = jwtHandler.generateToken({ id: newUser.id, email: newUser.email });

    await UserModel.update(newUser.id, { token: token });

    const data = {
      id: uuidv4(),
      email: newUser.email,
      token: token,
      createdAt: newUser.created_at,
      updatedAt: newUser.updated_at,
    };

    return data;
  }

  static async addUserInfo(id, payload) {
    await UserModel.update(id, payload);

    const user = await UserModel.findById(id);

    if(user.token === null) throw new Error("User not logged in");

    const data = {
      id: uuidv4(),
      email: user.email,
      token: user.token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new Error("User not found");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = jwtHandler.generateToken({ id: user.id, email: user.email });

    await UserModel.update(user.id, { token: token });

    const data = {
      id: uuidv4(),
      email: user.email,
      token: token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }

  static async logout(id) {
    await UserModel.update(id, { token: null });
  }
}

module.exports = UserService;
