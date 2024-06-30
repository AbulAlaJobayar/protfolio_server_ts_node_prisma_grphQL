import express, { Application, Request, Response } from "express";
import { userRoute } from "./app/modules/user/user.route";
import cors from "cors";
import { ExperienceRoute } from "./app/modules/experience/experience.route";
import { ProjectRoute } from "./app/modules/projects/project.route";
import { SkillRoute } from "./app/modules/skill/skill.route";
import { BlogRoute } from "./app/modules/blog/blog.route";
const app: Application = express();

//middleware
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api/v1", userRoute);
app.use("/api/v1", ExperienceRoute);
app.use("/api/v1", ProjectRoute);
app.use("/api/v1", SkillRoute);
app.use("/api/v1", BlogRoute);

export default app;
