const jwtHandler = require("../utils/jwtHandler");

class AuthMiddleware {
  static authenticate(req, _, next) {
    if (req.headers.authorization?.startsWith("Bearer ")) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decodedToken = jwtHandler.verifyToken(token);
        req.user = decodedToken;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          next(new Error("Token expired"));
        } else if (error.name === "JsonWebTokenError") {
          next(new Error("Invalid token"));
        }
      }
    } else {
      if (!req.headers.authorization) {
        next(new Error("Missing authorization header"));
      } else if (!req.headers.authorization.startsWith("Bearer ")) {
        next(new Error("Invalid authorization header"));
      }
    }
  }
}

module.exports = AuthMiddleware;
