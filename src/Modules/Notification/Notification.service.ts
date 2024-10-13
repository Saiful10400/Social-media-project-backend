import mongoose from "mongoose"
import notificationModel from "./Notification.model"

//1.
const createNoti=async(payload)=>{
    const result=await notificationModel.create(payload)
    return result
}

//2.
const getNoti=async(id)=>{
    const result=await notificationModel.find({receiver:new mongoose.Types.ObjectId(id)})
    return result
}

//3.



const notiser={createNoti,getNoti}

export default notiser