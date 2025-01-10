import { Tcomment } from "./comment.interface"
import CommentModel from "./comment.model"

const createOne=async(payload:Tcomment)=>{
    const result=await CommentModel.create(payload)
    return result
}

const deleteOne=async(id:string)=>{

    const result=await CommentModel.findByIdAndUpdate(id,{isDeleted:true})
    return result
}


const updateOne=async(id:string,payload:{[key :string]:string})=>{
    const result=await CommentModel.findByIdAndUpdate(id,payload)
    return result
}

const commentService={createOne,deleteOne,updateOne}
export default commentService