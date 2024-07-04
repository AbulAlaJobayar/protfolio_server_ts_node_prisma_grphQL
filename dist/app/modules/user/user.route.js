"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const route = (0, express_1.Router)();
route.post('/create_user', user_controller_1.userController.createUserIntoDB);
route.get("/user/:id", user_controller_1.userController.getUserFromDB);
exports.userRoute = route;
