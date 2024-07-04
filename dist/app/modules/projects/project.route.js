"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoute = void 0;
const express_1 = require("express");
const project_controller_1 = require("./project.controller");
const route = (0, express_1.Router)();
route.post("/create_project", project_controller_1.ProjectController.createProjectIntoDB);
route.get("/project", project_controller_1.ProjectController.getProjectFromDB);
exports.ProjectRoute = route;
