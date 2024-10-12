import { Request, Response } from "express";
import catchAsync from "../../Utility/catchAsync";
import sendResponse from "../../Utility/sendResponse";
import httpStatus from "http-status";
import paymentHistoryService from "./UserPayment.service";

//1. generate payment url.
const getaPayment = catchAsync(async (req: Request, res: Response) => {
    const tnxId = req.params.tnxId;
  
    const data = await paymentHistoryService.getAPaymentHistory(tnxId)
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "payment history retrieved.",
    });
  });


//get all
const getAll = catchAsync(async (req: Request, res: Response) => {
  
  
    const data = await paymentHistoryService.getAllPaymentHistory()
    sendResponse(res, {
      data,
      success: true,
      statusCode: httpStatus.OK,
      message: "payment history retrieved.",
    });
  });



  const paymentHistoryController={getaPayment,getAll}
  export default paymentHistoryController