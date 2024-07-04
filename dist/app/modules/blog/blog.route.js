"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoute = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const route = (0, express_1.Router)();
route.post("/create_blog", blog_controller_1.BlogController.createBlogIntoDB);
route.get("/blog", blog_controller_1.BlogController.getBlogFromDB);
exports.BlogRoute = route;
