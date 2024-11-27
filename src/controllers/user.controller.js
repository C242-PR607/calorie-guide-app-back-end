const UserSchema = require("../schemas/user");
const UserService = require("../services/user.service");
const ApiResponse = require("../utils/response");

class UserController {
  static async addUserInfo(req, res) {
    const payload = req.body;
    const { email, token } = req.user;

    UserSchema.addUserInfo().parse(payload);

    const data = await UserService.addUserInfo(payload, email, token);

    ApiResponse.success(res, 201, "User information added successfully", data);
  }

  static async showProfile(req, res) {
    const { email, token } = req.user;

    const data = await UserService.showProfile(email, token);

    ApiResponse.success(res, 200, "Profile fetched successfully", data);
  }

  static async updateProfile(req, res) {
    const payload = req.body;
    const { email, token } = req.user;

    UserSchema.updateProfile().parse(payload);

    const data = await UserService.updateProfile(payload, email, token);

    ApiResponse.success(res, 200, "Profile updated successfully", data);
  }

  static async changePassword(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email, token } = req.user;

    UserSchema.changePassword().parse({ oldPassword, newPassword, confirmPassword });

    const data = await UserService.changePassword(oldPassword, newPassword, email, token);

    ApiResponse.success(res, 200, "Password changed successfully. Please login again with new password", data);
  }

  static async deleteAccount(req, res) {
    const { password } = req.body;
    const { email, token } = req.user;

    UserSchema.deleteAccount().parse({ password });

    const data = await UserService.deleteAccount(password, email, token);

    ApiResponse.success(res, 200, "Account deleted successfully", data);
  }
}

module.exports = UserController;
