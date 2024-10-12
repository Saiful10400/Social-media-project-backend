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

const commentService={createOne,deleteOne}
export default commentService