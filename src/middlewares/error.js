const { ZodError } = require("zod");
const NotFoundError = require("../exceptions/NotFoundError");
const ApiError = require("../exceptions/ApiError");

class ErrorMiddleware {
  static notFound(_, __, next) {
    next(new NotFoundError("Resource not found"));
  }
  static errorHandler(err, _, res, __) {
    if (err instanceof ZodError) {
      return res.status(400).json({ status: "fail", data: err.issues });
    } else if (err instanceof ApiError) {
      return res.status(err.statusCode).json({ status: err.status, message: err.message, ...(err.errors && { data: err.errors }) });
    } else if (err.name === "SyntaxError") {
      return res.status(err.statusCode).json({ status: "fail", message: err.message });
    } else {
      return res.status(500).json({ status: "error", message: err.message });
    }
  }
}

module.exports = ErrorMiddleware;
