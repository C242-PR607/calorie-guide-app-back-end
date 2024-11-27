const ApiError = require("./apiError");

class AuthenticationError extends ApiError {
    constructor(message) {
        super(401, "error", message);
    }
}

module.exports = AuthenticationError;