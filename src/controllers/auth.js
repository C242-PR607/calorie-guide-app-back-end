const UserService = require("../services/user.service");
const OTPHandler = require("../utils/otp");

class AuthController {
  static async register(req, res) {
    const request = req.body;
    const data = await UserService.register(request);
    res.status(200).json({
      message: "OTP sent successfully",
      data: data,
    });
  }

  static async verifyOTP(req, res) {
    const { email, otp } = req.body;
    const storedUser = await OTPHandler.validateOTP(`otp:${email}`, otp, `user:${email}`);
    const data = await UserService.verifyOTP(storedUser);
    res.status(201).json({ message: "OTP verified successfully and user created", data: data });
  }

  static async addUserInfo(req, res) {
    const { id } = req.user;
    const payload = req.body;

    const data = await UserService.addUserInfo(id, payload);

    res.status(201).json({ message: "User information added successfully", data: data });
  }

  static async login(req, res) {
    const request = req.body;

    const data = await UserService.login(request.email, request.password);

    res.status(200).json({ message: "Login successful", data: data });
  }

  static async logout(req, res) {
    const { id } = req.user;

    await UserService.logout(id);

    res.status(200).json({ message: "Logout successful" });
  }
}

module.exports = AuthController;
