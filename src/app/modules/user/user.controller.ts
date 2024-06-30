import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.services";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUserIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createUserIntoDB(req.body);
  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const getUserFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getUserFromDB(req.params.id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "User Retrieved successfully",
    data: result,
  });
});
export const userController = {
  createUserIntoDB,
  getUserFromDB,
};
