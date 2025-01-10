import getPaymentUrl from "../../Utility/getPaymentUrl"
import { signupModel } from "../Authentication/authentication.model"
import UserPaymentModel from "../UserPayment/UserPayment.model"

type TuserdataForPayment={name:string,email:string,phone:string,address:string,_id:string}

const paywithBookingId=async(payload:string)=>{
    // retrieve your user info with id.
    const userData:TuserdataForPayment |null=await signupModel.findById(payload)
    if(!userData) return
    const bookingUrl=await getPaymentUrl(userData) 
    return bookingUrl
}

//2. update a pyment status.
const updateAbookingPaymentStatus=async(userId:string,tnxId:string,paymentMethod:string,amount:string|number,currency:string)=>{
    const result=await UserPaymentModel.create({userId,tnxId,paymentMethod,amount,currency})
    // update the user status.
    const updateUser=await signupModel.findByIdAndUpdate(userId,{verifyed:true})
    return {result,updateUser}
}



const paymentservice={paywithBookingId,updateAbookingPaymentStatus}

export default paymentservice    