"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    password: zod_1.z.string({
        required_error: "password is required",
        invalid_type_error: "password must be a string",
    })
});
exports.authValidation = {
    loginSchema
};
