import { Router } from "express";
import { BlogController } from "./blog.controller";

const route= Router();
route.post("/create_blog",BlogController.createBlogIntoDB)
route.get("/blog",BlogController.getBlogFromDB)
export const BlogRoute=route