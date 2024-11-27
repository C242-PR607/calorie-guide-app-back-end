const jwt = require("jsonwebtoken");

class JwtHandler {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JwtHandler;
