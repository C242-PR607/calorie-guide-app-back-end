const ApiError = require("./ApiError");

class ValidationError extends ApiError {
    constructor(message = null, errors) {
        super(400, "fail", message, errors);
    }
}

module.exports = ValidationError;