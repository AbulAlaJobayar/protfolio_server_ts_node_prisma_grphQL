"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const route = (0, express_1.Router)();
route.post('/login', auth_controller_1.authController.loginUser);
route.post('/refreshToken', auth_controller_1.authController.refreshToken);
route.post('/changePassword', (0, auth_1.default)(), auth_controller_1.authController.changePassword);
exports.authRoute = route;
