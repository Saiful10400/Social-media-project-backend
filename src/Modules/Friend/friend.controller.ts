import { Request, Response } from "express";
import sendResponse from "../../Utility/sendResponse";
import catchAsync from "../../Utility/catchAsync";
import { friendService } from "./friend.service";
import httpStatus from "http-status";

//1. create a friend request.
const createAfriendRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.createFriendRequest(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "frind request sended.",
    success: true,
  });
});

//2. modify frindrequest.
const modifyRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.modifyRequest(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "frind request sended.",
    success: true,
  });
});
//3. .
const getAUserAllFrind = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.allFrind(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "All rind retrieved.",
    success: true,
  });
});
//4.
const getFriendRequest = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.allFriendRequest(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "All friend request retrieved.",
    success: true,
  });
});

const peopleYouMayKnow = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.peopleYouMayKnow(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "people you may khow retrieved.",
    success: true,
  });
});

const getExistingFriends = catchAsync(async (req: Request, res: Response) => {
  const result = await friendService.getExistingFriends(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "all existing friend retrieved.",
    success: true,
  });
});


export const frindController = {
  createAfriendRequest,
  modifyRequest,
  getAUserAllFrind,
  getFriendRequest,
  peopleYouMayKnow,
  getExistingFriends
};
