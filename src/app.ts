import express, { Application, Request, Response } from "express";
import { userRoute } from "./app/modules/user/user.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ExperienceRoute } from "./app/modules/experience/experience.route";
import { ProjectRoute } from "./app/modules/projects/project.route";
import { SkillRoute } from "./app/modules/skill/skill.route";
import { BlogRoute } from "./app/modules/blog/blog.route";

import notFound from "./app/middleware/notFound";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { authRoute } from "./app/modules/auth/auth.router";
const app: Application = express();

//middleware
app.use(cors({
  origin:  ['http://localhost:3000','*'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/v1", userRoute);
app.use("/api/v1", ExperienceRoute);
app.use("/api/v1", ProjectRoute);
app.use("/api/v1", SkillRoute);
app.use("/api/v1", BlogRoute);
app.use("/api/v1", authRoute);

app.use(globalErrorHandler);
app.use(notFound);
export default app;
