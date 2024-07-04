import { Router } from "express";
import { ProjectController } from "./project.controller";


const route= Router();
route.post("/create_project",ProjectController.createProjectIntoDB)
route.get("/project",ProjectController.getProjectFromDB)
route.get("/single_project/:id",ProjectController.getSingleProjectFromDB)
export const ProjectRoute=route