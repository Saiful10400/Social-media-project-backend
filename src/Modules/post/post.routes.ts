import { Router } from "express";
import postController from "./post.controller";


const router=Router()


//1. create one.
router.post("/",postController.createOne)

//2. delete one.
router.delete("/",postController.createOne)

//3. update one.
router.put("/",postController.updateOne)

//4. all get.
router.get("/",postController.getAll)

//get onepost
router.get("/post/:id",postController.getOne)

//get total vote
router.get("/totalvote/:id",postController.totalvote)

//get a user all
router.get("/user/:id",postController.getOneusersAll)

const postRoute=router
export default postRoute 