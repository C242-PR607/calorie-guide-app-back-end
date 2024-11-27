const crypto = require("crypto");

class OTPHandler {
  static generateOTP(length = 6) {
    return crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length)).toString();
  }
}

module.exports = OTPHandler;
