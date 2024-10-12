import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import favouriteService from "./favourite.service";



const Togglefavourite = catchAsync(async (req: Request, res: Response) => {

    const result = await favouriteService.Togglefavourite(req.body)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "favourite listed created successfully.",
      success: true,
    });
  });






  const favouriteController={Togglefavourite}
  export default favouriteController   