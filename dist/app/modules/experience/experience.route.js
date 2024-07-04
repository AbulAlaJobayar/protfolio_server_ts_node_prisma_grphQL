"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceRoute = void 0;
const express_1 = require("express");
const experience_controller_1 = require("./experience.controller");
const route = (0, express_1.Router)();
route.post("/create_experience", experience_controller_1.ExperienceController.createExperienceIntoDB);
route.get("/experience", experience_controller_1.ExperienceController.getExperienceFromDB);
exports.ExperienceRoute = route;
