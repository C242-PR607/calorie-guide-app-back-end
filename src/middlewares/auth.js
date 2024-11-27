const AuthenticationError = require("../exceptions/AuthenticationError");
const ValidationError = require("../exceptions/ValidationError");
const JwtHandler = require("../utils/jwtHandler");

class AuthMiddleware {
  static authenticate(req, _, next) {
    if (req.headers.authorization?.startsWith("Bearer ")) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decodedToken = JwtHandler.verifyToken(token);
        req.user = decodedToken;
        req.user.token = token;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          next(new AuthenticationError("Token expired"));
        } else if (error.name === "JsonWebTokenError") {
          next(new AuthenticationError("Invalid token"));
        }
      }
    } else {
      if (!req.headers.authorization) {
        next(new ValidationError("Missing authorization header"));
      } else if (!req.headers.authorization.startsWith("Bearer ")) {
        next(new ValidationError("Invalid authorization header"));
      }
    }
  }
}

module.exports = AuthMiddleware;
