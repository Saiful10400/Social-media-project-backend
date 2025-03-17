import { Router } from "express";
import { frindController } from "./friend.controller";

const router=Router()

router.post("/create",frindController.createAfriendRequest)

router.put("/modify",frindController.modifyRequest)

router.get("/getallFrindReference/:id",frindController.getAUserAllFrind)

router.get("/friendRequest/:id",frindController.getFriendRequest)

//2. people you may know.
router.get("/peopleYouMayknow/:id",frindController.peopleYouMayKnow)

// get existing friends.
router.get("/existingFriends/:id",frindController.getExistingFriends)

const friendRoutes=router
export default friendRoutes