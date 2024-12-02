const ApiError = require("./ApiError");

class DatabaseError extends ApiError {
  constructor(message) {
    super(409, "error", message);
  }
}

module.exports = DatabaseError;
