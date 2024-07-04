import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ExperienceService } from "./experience.service";

const createExperienceIntoDB = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await ExperienceService.createExperienceIntoDB(
      req.body,
      req.user
    );
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Experience created successfully",
      data: result,
    });
  }
);
const getExperienceFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.getExperienceFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Experience Retrieved successfully",
    data: result,
  });
});
export const ExperienceController = {
  createExperienceIntoDB,
  getExperienceFromDB,
};
