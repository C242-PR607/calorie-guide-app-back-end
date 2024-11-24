const HttpException = require("../exceptions");

class ErrorMiddleware {
  static errorHandler(err, req, res, next) {
    if (err instanceof HttpException) {
      return res.status(err.statusCode).json({ message: err.message, errors: err.errors });
    }
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = ErrorMiddleware;
