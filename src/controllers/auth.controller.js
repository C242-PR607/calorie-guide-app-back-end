const UserSchema = require("../schemas/user");
const AuthService = require("../services/auth.service");
const ApiResponse = require("../utils/response");

class AuthController {
  static async register(req, res) {
    const { email, password, confirmPassword } = req.body;

    UserSchema.register().parse({ email, password, confirmPassword });

    const data = await AuthService.register({ email, password });

    ApiResponse.success(res, 200, "OTP sent successfully", data);
  }

  static async verifyOTP(req, res) {
    const { otp } = req.body;
    const { email, otp: storedOTP, token } = req.user;

    UserSchema.verifyOTP().parse({ otp });

    const data = await AuthService.verifyOTP(otp, email, storedOTP, token);

    if (!data.id) {
      ApiResponse.success(res, 200, "OTP verified successfully. Your reset password token has been set within 10 minutes. Please reset your password immediately", data);
    } else {
      ApiResponse.success(res, 201, "OTP verified successfully and user created", data);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    UserSchema.login().parse({ email, password });

    const data = await AuthService.login(email, password);

    ApiResponse.success(res, 200, "Login successful", data);
  }

  static async logout(req, res) {
    const { email, token } = req.user;

    const data = await AuthService.logout(email, token);

    ApiResponse.success(res, 200, "Logout successful", data);
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    UserSchema.forgotPassword().parse({ email });

    const data = await AuthService.forgotPassword(email);

    ApiResponse.success(res, 200, "OTP sent successfully", data);
  }

  static async resetPassword(req, res) {
    const { password, confirmPassword } = req.body;
    const { email, token } = req.user;

    UserSchema.resetPassword().parse({ password, confirmPassword });

    const data = await AuthService.resetPassword(password, email, token);

    ApiResponse.success(res, 200, "Password reset successful. Please login with new password", data);
  }
}

module.exports = AuthController;
