import mongoose from "mongoose"
import favouriteModel from "./favourite.model"

// create one.
const Togglefavourite=async(payload)=>{
    console.log(payload)

// at first check is this exist or not.
const isexist=await favouriteModel.findOne({postId:new mongoose.Types.ObjectId(payload.postId),userId:new mongoose.Types.ObjectId(payload.userId)})

if(isexist){
    const result=await favouriteModel.deleteOne({postId:new mongoose.Types.ObjectId(payload.postId),userId:new mongoose.Types.ObjectId(payload.userId)})
    return result
} else{
    const result=await favouriteModel.create(payload)
    return result
}


    // const result=await favouriteModel.create(payload) 
    // return result
}




const favouriteService={Togglefavourite}
export default favouriteService