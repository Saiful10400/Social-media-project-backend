import UserPaymentModel from "./UserPayment.model"

const getAPaymentHistory=async(tnxId:string)=>{
    const result=await UserPaymentModel.findOne({tnxId})
    return result
}


const paymentHistoryService={getAPaymentHistory}
export default paymentHistoryService