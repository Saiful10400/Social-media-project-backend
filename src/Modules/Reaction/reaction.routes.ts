import { Router } from "express";
import reactionController from "./reaction.controller";



const router=Router()


//1. create one.
router.post("/",reactionController.manageReaction)


const reactionRouter=router
export default reactionRouter 