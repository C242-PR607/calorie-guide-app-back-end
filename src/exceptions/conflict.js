const HttpException = require(".");

class ConflictException extends HttpException {
    constructor(errors) {
        super(409, "Conflict", errors);
    }
}

module.exports = ConflictException;