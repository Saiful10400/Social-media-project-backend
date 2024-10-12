import UserPaymentModel from "./UserPayment.model"

const getAPaymentHistory=async(tnxId:string)=>{
    const result=await UserPaymentModel.findOne({tnxId})
    return result
}

const getAllPaymentHistory=async()=>{
    const result=await UserPaymentModel.find().populate("userId")
    
    return result
}


const paymentHistoryService={getAPaymentHistory,getAllPaymentHistory}
export default paymentHistoryService