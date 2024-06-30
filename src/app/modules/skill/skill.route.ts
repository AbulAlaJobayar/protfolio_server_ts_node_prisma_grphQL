import { Router } from "express";
import { SkillController } from "./skill.controller";



const route= Router();
route.post("/create_skill",SkillController.createSkillIntoDB)
route.get("/skill",SkillController.getSkillFromDB)
export const SkillRoute=route