import mongoose from "mongoose"
import { Tfollow } from "./following.interface"
import followingModel from "./following.model"


//1. create a following.
const createAFollowing=async(payload:Tfollow)=>{
    
    const result=await followingModel.create(payload)
    return result
}


//2. get ones follow & following.
const getfollowAndFollowing=async(id)=>{
    const followers=await followingModel.find({following:new mongoose.Types.ObjectId(id)}).select("follower").populate("follower")
    const following=await followingModel.find({follower:new mongoose.Types.ObjectId(id)}).select("following").populate("following")
    return{followers,following}
}

//3. delete a follower
const makeAUnfollow=async(payload)=>{
    
    const result=await followingModel.deleteOne({follower:new mongoose.Types.ObjectId(payload.follower),following:new mongoose.Types.ObjectId(payload.following)})
   
    return result
}

const followingService={createAFollowing,getfollowAndFollowing,makeAUnfollow}
export default followingService