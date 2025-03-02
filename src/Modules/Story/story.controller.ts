import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import storyService from "./story.service";

// create music.
const addMusic = catchAsync(async (req: Request, res: Response) => {
  const result = await storyService.addMusic(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "new music added.",
    success: true,
  });
});

const getMusic = catchAsync(async (req: Request, res: Response) => {
  let result

  if(req.query?.id){
    result=await storyService.getAMusic(req.query.id as string)
  } else{
    result=await storyService.getAllMusic()
  }

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "All music retrieved.",
    success: true,
  });
});


// story.

const createStory = catchAsync(async (req: Request, res: Response) => {

  const result=await storyService.createStory(req.body)

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Story created.",
    success: true,
  });
});


const getStory = catchAsync(async (req: Request, res: Response) => {

  const result=await storyService.getStory(req.body)

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Story retrieved.",
    success: true,
  });
});




const storyController={addMusic,getMusic,createStory,getStory}
export default storyController