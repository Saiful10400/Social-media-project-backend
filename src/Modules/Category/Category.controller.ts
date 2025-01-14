import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import categoryService from "./Category.service";

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getAllCategory()

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "All category retrieved.",
    success: true,
  });
});
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.deleteCategory(req.params.id)

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "All category retrieved.",
    success: true,
  });
});

const CategoryController={getAllCategory,deleteCategory}
export default CategoryController;
