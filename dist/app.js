"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const experience_route_1 = require("./app/modules/experience/experience.route");
const project_route_1 = require("./app/modules/projects/project.route");
const skill_route_1 = require("./app/modules/skill/skill.route");
const blog_route_1 = require("./app/modules/blog/blog.route");
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const auth_router_1 = require("./app/modules/auth/auth.router");
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://portfolio-rose-theta-63.vercel.app', '*'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/v1", user_route_1.userRoute);
app.use("/api/v1", experience_route_1.ExperienceRoute);
app.use("/api/v1", project_route_1.ProjectRoute);
app.use("/api/v1", skill_route_1.SkillRoute);
app.use("/api/v1", blog_route_1.BlogRoute);
app.use("/api/v1", auth_router_1.authRoute);
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.default);
exports.default = app;
