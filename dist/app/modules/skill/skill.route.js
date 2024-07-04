"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillRoute = void 0;
const express_1 = require("express");
const skill_controller_1 = require("./skill.controller");
const route = (0, express_1.Router)();
route.post("/create_skill", skill_controller_1.SkillController.createSkillIntoDB);
route.get("/skill", skill_controller_1.SkillController.getSkillFromDB);
exports.SkillRoute = route;
