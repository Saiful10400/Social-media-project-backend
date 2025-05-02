import { Router } from "express";
import storyController from "./story.controller";
 

const router=Router()

router.post("/add-music",storyController.addMusic)
router.get("/all-music",storyController.getMusic)

// create story.
router.post("/create-story",storyController.createStory)

router.get("/get-story",storyController.getStory)


const storyRoutes=router
export default storyRoutes 

 