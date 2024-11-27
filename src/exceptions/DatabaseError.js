const ApiError = require("./apiError");

class DatabaseError extends ApiError {
  constructor(message) {
    super(409, "error", message);
  }
}

module.exports = DatabaseError;
