import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import pageService from "./page.service";
 

// create page.
const createPage = catchAsync(async (req: Request, res: Response) => {
  const result = await pageService.createPage(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Page created",
    success: true,
  });
});

// update page.
const updatePage = catchAsync(async (req: Request, res: Response) => {
  
 
  const result = await pageService.updatePage(req.params.id,req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Page updated",
    success: true,
  });
});

//a user all page.
const auserAllPage = catchAsync(async (req: Request, res: Response) => {
  let result
  if(req?.query?.invitation==="true"){
    result=await pageService.userAllInvitationPage(req?.params?.id)
  } else{
    result=await pageService.userAllPage(req?.params?.id)
  }

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "User lagacy pages retrieved.",
    success: true,
  });
});

//invite a user.
const invite = catchAsync(async (req: Request, res: Response) => {
  const result = await pageService.createAPageUserInstance(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "invitation created",
    success: true,
  });
});

//modify invite.
const modifyInvite = catchAsync(async (req: Request, res: Response) => {
  let result
  if(req.query?.accept==="true"){
    result = await pageService.modifyInvitation(req.params?.id,true);
  } else{
    result = await pageService.modifyInvitation(req.params?.id,false);
  }

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Invitation modifide",
    success: true,
  });
});

// a page details.
const aPageDetails = catchAsync(async (req: Request, res: Response) => {

  const result =await pageService.aPageDetails(req.params?.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Invitation modifide",
    success: true,
  });
});

// a page all members.
const aPageAllMembers = catchAsync(async (req: Request, res: Response) => {

  const result =await pageService.aPageFollowers(req.params?.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "Invitation modifide",
    success: true,
  });
});

// a page all posts.
const aPageAllPosts= catchAsync(async (req: Request, res: Response) => {

  const result =await pageService.aPageAllPosts(req.params?.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "A page all posts retrieved.",
    success: true,
  });
});


// a user all followingPages.
const aUserAllFollowingPages= catchAsync(async (req: Request, res: Response) => {

 const result =await pageService.auserAllFollowingPages(req.params?.userId);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "a user all following page",
    success: true,
  });
});




const pageController={createPage,auserAllPage,invite,modifyInvite,aPageDetails,aPageAllMembers,updatePage,aPageAllPosts,aUserAllFollowingPages}
export default pageController