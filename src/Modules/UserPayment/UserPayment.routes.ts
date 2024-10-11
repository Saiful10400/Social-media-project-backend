import { Router } from "express";
import paymentHistoryController from "../UserPayment/UserPayment.controller";



const router=Router()


router.get("/:tnxId",paymentHistoryController.getaPayment)


const paymentHistoryRoute=router
export default paymentHistoryRoute