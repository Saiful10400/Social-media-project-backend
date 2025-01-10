import mongoose from "mongoose"
import notificationModel from "./Notification.model"

//1.
const createNoti=async(payload:{[key:string]:string|number|boolean})=>{
    const result=await notificationModel.create(payload)
    return result
}

//2.
const getNoti=async(id:string)=>{
    const result=await notificationModel.find({for:new mongoose.Types.ObjectId(id)})
    return result
}

//3.
const makeAllRead=async(id:string)=>{
    const result=await notificationModel.updateMany({for:new mongoose.Types.ObjectId(id)},{$set:{isRead:true}})
    return result
}


const notiser={createNoti,getNoti,makeAllRead}

export default notiser