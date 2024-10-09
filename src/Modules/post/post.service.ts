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

}

//5. get one.
const getOne=async(id)=>{
    
}



const postService={createOne,updateOne,deleteOne,getAll,getOne}
export default postService