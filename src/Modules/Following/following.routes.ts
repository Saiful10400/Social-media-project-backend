import { Router } from "express";
import followController from "./following.controller";

const router=Router()


//1. make a following

router.post("/",followController.createAfollowing)

//2. get ones follow & following

router.get("/:id",followController.getOneFollowingAndFollers)


//3. Delete a follow & following

router.delete("/",followController.makeAUnfollow)

// export the module.
const followRoute=router
export default followRoute 