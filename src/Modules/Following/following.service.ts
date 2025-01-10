import mongoose from "mongoose"
import { Tfollow } from "./following.interface"
import followingModel from "./following.model"
import { sendNotiFicationWithSocketIo } from "../Socketio"


//1. create a following.
const createAFollowing=async(payload:Tfollow)=>{
    
    const create=await followingModel.create(payload)
    const result:{follower:{name:string,_id:string},following:{_id:string}}=await(await  create.populate("follower")).populate("following")
    
    sendNotiFicationWithSocketIo({content:`${result.follower.name} follow you.`,type:"follow",for:result.following?._id,by:result.follower?._id})
    return result
}


//2. get ones follow & following.
const getfollowAndFollowing=async(id:string)=>{
    const followers=await followingModel.find({following:new mongoose.Types.ObjectId(id)}).select("follower").populate("follower")
    const following=await followingModel.find({follower:new mongoose.Types.ObjectId(id)}).select("following").populate("following")
    return{followers,following}
}

//3. delete a follower
const makeAUnfollow=async(payload:{follower:string,following:string})=>{
    
    const result=await followingModel.deleteOne({follower:new mongoose.Types.ObjectId(payload.follower),following:new mongoose.Types.ObjectId(payload.following)})
   
    return result
}

const followingService={createAFollowing,getfollowAndFollowing,makeAUnfollow}
export default followingService