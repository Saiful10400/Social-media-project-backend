import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";

//2. get all follower and following.
const deleteAfollower = catchAsync(async (req: Request, res: Response) => {
    const result = await followingService.deleteAfollower(req.params.id);
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "Follower deleted successfully.",
      success: true,
    });
  });




  const followerController={}
  export default followerController