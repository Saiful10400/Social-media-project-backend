import { Router } from "express";
import postController from "./post.controller";


const router=Router()


//1. create one.
router.post("/",postController.createOne)

//2. delete one.
router.delete("/:id",postController.deleteOne)

//3. update one.
router.put("/:id",postController.updateOne)

//4. all get.
router.get("/",postController.getAll)

//get onepost
router.get("/post/:id",postController.getOne)

//get total vote
router.get("/totalvote/:id",postController.totalvote)

//get a user all
router.get("/user/:id",postController.getOneusersAll)

//block
router.put("/block/:id",postController.blockAPost)


//8. gel all post image.
router.get("/image",postController.allpostImage)

//9. get all data for newsfeed.
router.get("/newsfeed",postController.getAllNews)


const postRoute=router
export default postRoute 