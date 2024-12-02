const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const ValidationError = require("../exceptions/ValidationError");
const AuthorizationError = require("../exceptions/AuthorizationError");

class UserService {
  static async addUserInfo(payload, email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user.token !== token) throw new AuthenticationError("Invalid token");

    await UserModel.update(payload, { email: email });

    const data = {
      id: uuidv4(),
      email: user.email,
      token: user.token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }

  static async showProfile(email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user.token !== token) throw new AuthenticationError("Invalid token");

    const data = {
      id: uuidv4(),
      email: user.email,
      name: user.name,
      age: user.age,
      height: user.height,
      weight: user.weight,
      gender: user.gender,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return data;
  }

  static async updateProfile(payload, email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user.token !== token) throw new AuthenticationError("Invalid token");

    await UserModel.update(payload, { email: email });

    const updatedUser = await UserModel.findByEmail(email);

    const data = {
      id: uuidv4(),
      email: updatedUser.email,
      name: updatedUser.name,
      age: updatedUser.age,
      height: updatedUser.height,
      weight: updatedUser.weight,
      gender: updatedUser.gender,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return data;
  }

  static async changePassword(oldPassword, newPassword, email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user.token !== token) throw new AuthenticationError("Invalid token");

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) throw new ValidationError("Invalid old password");

    if (oldPassword === newPassword) throw new AuthorizationError("New password cannot be same as old password");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.update({ password: hashedPassword, token: null }, { email: email });

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

  static async deleteAccount(password, email, token) {
    const user = await UserModel.findByEmail(email);

    if (!user) throw new NotFoundError("User not found");

    if (user.token === null) throw new AuthenticationError("User not logged in");

    if (user.token !== token) throw new AuthenticationError("Invalid token");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new ValidationError("Invalid password");

    await UserModel.delete({ email: email });

    const data = null;

    return data;
  }
}

module.exports = UserService;
