class ApiError extends Error {
  constructor(statusCode, status, message, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.errors = errors;
  }
}

module.exports = ApiError;
