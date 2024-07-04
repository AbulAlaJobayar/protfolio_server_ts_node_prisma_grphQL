"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(statusCode, message, stuck = "") {
        super(message);
        this.statusCode = statusCode;
        if (stuck) {
            this.stack = stuck;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppError;
