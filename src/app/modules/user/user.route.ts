import { Router } from "express";
import { userController } from "./user.controller";

const route=Router()
route.post('/create_user',userController.createUserIntoDB)
route.get("/user/:id",userController.getUserFromDB)

export const userRoute=route