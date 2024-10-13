import mongoose from "mongoose"
import reactonModel from "../Reaction/reaction.model"
import { Tpost } from "./post.interface"
import postModel from "./post.model"
import CommentModel from "../Comment/comment.model"
import favouriteModel from "../Favourite/favourite.model"

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
const allPost=await postModel.find({isDeleted:false}).populate("creator")


const result=allPost.map(async(item)=>{
    const reaction=await reactonModel.find({post:new mongoose.Types.ObjectId(item?._id)})
    const comments=await CommentModel.find({post:new mongoose.Types.ObjectId(item?._id),isDeleted:false}).populate("commentor")
    const favourite=await favouriteModel.find({postId:new mongoose.Types.ObjectId(item?._id)})
    return{post:item,reaction,comments,favourite}
})

return Promise.all(result)


}

//5. get one.
const getOne=async(id:string)=>{
    const aPost=await postModel.findById(id).populate("creator")
    const reaction=await reactonModel.find({post:new mongoose.Types.ObjectId(aPost?._id)})
    const comments=await CommentModel.find({post:new mongoose.Types.ObjectId(aPost?._id),isDeleted:false}).populate("commentor")
    const favourite=await favouriteModel.find({postId:new mongoose.Types.ObjectId(aPost?._id)})
    return{post:aPost,reaction,comments,favourite}
}

//total vote.
const totalvote=async(id:string)=>{
    const aPost=await postModel.find({creator:new mongoose.Types.ObjectId(id)})
   const totalVote=aPost.reduce((prev,current)=>prev+current?.vote , 0)
    return totalVote
    
}


//5. get one.
const getAuserAllPost=async(id:string)=>{
    const allPost=await postModel.find({creator:new mongoose.Types.ObjectId(id),isDeleted:false}).populate("creator")

const result=allPost.map(async(item)=>{
    const allPromises=await reactonModel.find({post:new mongoose.Types.ObjectId(item?._id)})
    const comments=await CommentModel.find({post:new mongoose.Types.ObjectId(item?._id),isDeleted:false}).populate("commentor")
    const favourite=await favouriteModel.find({postId:new mongoose.Types.ObjectId(item?._id)})
    return{post:item,reaction:allPromises,comments,favourite}
})


return Promise.all(result)


}

//5.1 get all favourite post.
const getAUserAllFavouritePost=async(id:string)=>{
    const result=await favouriteModel.find({userId:new mongoose.Types.ObjectId(id)}).populate("userId").populate({path:"postId",populate:{path:"creator"}})
    return result
}

//6. block a post.
const blockAPost=async(id:string)=>{
    const prev=await postModel.findById(id)
    const result=await postModel.findByIdAndUpdate(id,{isBlock:!prev?.isBlock})
    return result
}

//7. get all post image.
const allPostImage=async()=>{
    const result=await postModel.find().select("img")
    return result
}


//8. 



const postService={createOne,getAUserAllFavouritePost,updateOne,deleteOne,getAll,getOne,getAuserAllPost,totalvote,blockAPost,allPostImage}
export default postService