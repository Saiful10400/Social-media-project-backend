import { Router } from "express";
import commentController from "./comment.controller";




const router=Router()


//1. create one.
router.post("/",commentController.createOne)

//1. delete one.
router.delete("/:id",commentController.deleteOne)


const commentRoute=router
export default commentRoute  