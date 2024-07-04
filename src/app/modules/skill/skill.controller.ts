import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { SkillService } from "./skill.service";

const createSkillIntoDB = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await SkillService.createSkillIntoDB(req.body, req.user);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Skill created successfully",
      data: result,
    });
  }
);
const getSkillFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillService.getSkillFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "skills Retrieved successfully",
    data: result,
  });
});
export const SkillController = {
  createSkillIntoDB,
  getSkillFromDB,
};
