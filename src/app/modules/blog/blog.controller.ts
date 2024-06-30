import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BlogService } from "./blog.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";


const createBlogIntoDB = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await BlogService.createBlogIntoDB(req.body, req.user);
    sendResponse(res, {
      status: httpStatus.CREATED,
      success: true,
      message: "Blog created successfully",
      data: result,
    });
  }
);
const getBlogFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogFromDB();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Blogs Retrieved successfully",
    data: result,
  });
});
export const BlogController = {
  createBlogIntoDB,
  getBlogFromDB,
};
