import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import commentService from "./comment.service";


const createOne = catchAsync(async (req: Request, res: Response) => {
console.log(req.body)
    const result = await commentService.createOne(req.body)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "comment created successfully.",
      success: true,
    });
  });

  // delete one. 
const deleteOne = catchAsync(async (req: Request, res: Response) => {

    const result = await commentService.deleteOne(req.params.id)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "comment deleted successfully.",
      success: true,
    });
  });

  const commentController={createOne,deleteOne}
  export default commentController   