import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ProjectService } from "./project.service";

const createProjectIntoDB = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await ProjectService.createProjectIntoDB(req.body, req.user);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Project created successfully",
      data: result,
    });
  }
);
const getProjectFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectService.getProjectFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "project Retrieved successfully",
    data: result,
  });
});
const getSingleProjectFromDB = catchAsync(async (req: Request, res: Response) => {
  const {id}=req.params
  const result = await ProjectService.getSingleProjectFromDB(id);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "project Retrieved successfully",
    data: result,
  });
});
export const ProjectController = {
  createProjectIntoDB,
  getProjectFromDB,
  getSingleProjectFromDB
};
