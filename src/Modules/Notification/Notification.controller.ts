import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import notiser from "./Notification.service";


const getNoti = catchAsync(async (req: Request, res: Response) => {

    const result = await notiser.getNoti(req.params?.id)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "getted all noti.",
      success: true,
    });
  });

const makeAUserAllRead = catchAsync(async (req: Request, res: Response) => {

    const result = await notiser.makeAllRead(req.params?.id)
  
    sendResponse(res, {
      data: result,
      statusCode: httpStatus.OK,
      message: "getted all noti.",
      success: true,
    });
  });

  const noticontroller={getNoti,makeAUserAllRead}
  export default noticontroller