import mongoose from "mongoose"
import reactonModel from "../Reaction/reaction.model"
import { Tpost } from "./post.interface"
import postModel from "./post.model"

//1. create a post.
const createOne=async(payload:Tpost)=>{
    const result =await postModel.create(payload)
    return result
}
//2. update one.
const updateOne=async(id,payload)=>{
    const result=await postModel.findByIdAndUpdate(id,payload)
    return result
}
//3. delete one.
const deleteOne=async(id)=>{
    const result=await postModel.findByIdAndUpdate(id,{isDeleted:true})
    return result
}

//4. get all.
const getAll=async()=>{
const allPost=await postModel.find().populate("creator")


const result=allPost.map(async(item)=>{
    const allPromises=await reactonModel.find({post:new mongoose.Types.ObjectId(item?._id)})
    return{post:item,reaction:allPromises}
})

return Promise.all(result)


// console.log(allPost,allReaction,"post and reaction")

}

//5. get one.
const getOne=async(id:string)=>{
    const aPost=await postModel.findById(id).populate("creator")
    const reaction=await reactonModel.find({post:new mongoose.Types.ObjectId(aPost?._id)})
    return{post:aPost,reaction}
}

//total vote.
const totalvote=async(id:string)=>{
    const aPost=await postModel.find({creator:new mongoose.Types.ObjectId(id)})
   const totalVote=aPost.reduce((prev,current)=>prev+current?.vote , 0)
    return totalVote
    
}


//5. get one.
const getAuserAllPost=async(id:string)=>{
    const allPost=await postModel.find({creator:new mongoose.Types.ObjectId(id)}).populate("creator")

const result=allPost.map(async(item)=>{
    const allPromises=await reactonModel.find({post:new mongoose.Types.ObjectId(item?._id)})
    return{post:item,reaction:allPromises}
})

return Promise.all(result)


}



const postService={createOne,updateOne,deleteOne,getAll,getOne,getAuserAllPost,totalvote}
export default postService