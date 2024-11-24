const crypto = require("crypto");
const redisClient = require("../config/redis");

class OTPHandler {
  static generateOTP(length = 6) {
    return crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
  }

  static async storeOTP(otpKey, otpValue, userKey, userValue, expiry = 300) {
    await redisClient.set(otpKey, otpValue);
    await redisClient.expire(otpKey, expiry);
    await redisClient.set(userKey, userValue);
    await redisClient.expire(userKey, expiry);
  }

  static async validateOTP(otpKey, otp, userKey) {
    const storedOTP = await redisClient.get(otpKey);
    const storedUser = await redisClient.get(userKey);

    if (!storedOTP) throw new Error("OTP not found or expired");

    if (storedOTP !== otp) throw new Error("Invalid OTP");

    if (!storedUser) throw new Error("User not found");

    await redisClient.del(otpKey);

    return JSON.parse(storedUser);
  }
}

module.exports = OTPHandler;
