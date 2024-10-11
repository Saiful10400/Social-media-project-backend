import getPaymentUrl from "../../Utility/getPaymentUrl"
import { signupModel } from "../Authentication/authentication.model"
import UserPaymentModel from "../UserPayment/UserPayment.model"


const paywithBookingId=async(payload)=>{
    // retrieve your user info with id.
    const userData=await signupModel.findById(payload)
    const bookingUrl=await getPaymentUrl(userData) 
    return bookingUrl
}

//2. update a pyment status.
const updateAbookingPaymentStatus=async(userId,tnxId,paymentMethod,amount,currency)=>{
    const result=await UserPaymentModel.create({userId,tnxId,paymentMethod,amount,currency})
    // update the user status.
    const updateUser=await signupModel.findByIdAndUpdate(userId,{verifyed:true})
    return {result,updateUser}
}



const paymentservice={paywithBookingId,updateAbookingPaymentStatus}

export default paymentservice    