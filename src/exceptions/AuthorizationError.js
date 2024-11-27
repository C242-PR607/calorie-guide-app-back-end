const ApiError = require("./apiError");

class AuthorizationError extends ApiError {
    constructor(message) {
        super(403, "error", message);
    }
}

module.exports = AuthorizationError;