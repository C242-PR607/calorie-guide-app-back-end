const ApiError = require("./ApiError");

class AuthenticationError extends ApiError {
    constructor(message) {
        super(401, "error", message);
    }
}

module.exports = AuthenticationError;