import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import postService from "./post.service";

//1.create one.

const createOne = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.createOne(req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "post created successfully.",
    success: true,
  });
});

//2.delete one.

const deleteOne = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.deleteOne(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "post deleted successfully.",
    success: true,
  });
});

//3.update one.

const updateOne = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.updateOne(req.params.id, req.body);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "post updated successfully.",
    success: true,
  });
});

//4. get all post.

const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAll();

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "all post retrieved successfully.",
    success: true,
  });
});

//5. get one post.

const getOne = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getOne(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "a post retrieved successfully.",
    success: true,
  });
});

//total vote

const totalvote = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.totalvote(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "total vote retrieved successfully.",
    success: true,
  });
});

//6. get one user's all.

const getOneusersAll = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.getAuserAllPost(req.params.id);
  const favouritePost=await postService.getAUserAllFavouritePost(req.params.id)

  sendResponse(res, {
    data: {all:result,favourite:favouritePost},
    statusCode: httpStatus.OK,
    message: "a user's all post retrieved successfully.",
    success: true,
  });
});

//6. get one user's all.

const blockAPost = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.blockAPost(req.params.id);

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "blocked successfully.",
    success: true,
  });
});


//8.get all post.
const allpostImage = catchAsync(async (req: Request, res: Response) => {
  const result = await postService.allPostImage();

  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    message: "all post image retrieved successfully.",
    success: true,
  });
});




const postController = {
  allpostImage,
  createOne,
  deleteOne,
  blockAPost,
  updateOne,
  getAll,
  getOne,
  totalvote,
  getOneusersAll,
};
export default postController;
