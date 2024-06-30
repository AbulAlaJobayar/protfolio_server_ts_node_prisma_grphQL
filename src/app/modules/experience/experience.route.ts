import { Router } from "express";
import { ExperienceController } from "./experience.controller";

const route= Router();
route.post("/create_experience",ExperienceController.createExperienceIntoDB)
route.get("/experience",ExperienceController.getExperienceFromDB)
export const ExperienceRoute=route