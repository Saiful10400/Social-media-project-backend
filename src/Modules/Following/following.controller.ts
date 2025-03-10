import httpStatus from "http-status";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import { Request, Response } from "express";
import followingService from "./following.service";



//1. create a following.
const createAfollowing = catchAsync(async (req: Request, res: Response) => {
    const result = await followingService.createAFollowing(req.body);
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "Followed successfully.",
      success: true,
    });
  });

//2. get all follower and following.
const getOneFollowingAndFollers = catchAsync(async (req: Request, res: Response) => {
    const result = await followingService.getfollowAndFollowing(req.params.id);
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "Follower and following retrieved successfully.",
      success: true,
    });
  });

//2. get all follower and following.
const makeAUnfollow = catchAsync(async (req: Request, res: Response) => {
    const result = await followingService.makeAUnfollow(req.body);
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "Follower unfollowed successfully.",
      success: true,
    });
  });



  const followController={createAfollowing,getOneFollowingAndFollers,makeAUnfollow}

  export default followController
  