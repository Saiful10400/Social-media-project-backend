import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import reactionService from "./reaction.service";

const manageReaction = catchAsync(async (req: Request, res: Response) => {

    const result = await reactionService.manageReaction(req.body)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "post updated successfully.",
      success: true,
    });
  });

  const reactionController={manageReaction}
  export default reactionController