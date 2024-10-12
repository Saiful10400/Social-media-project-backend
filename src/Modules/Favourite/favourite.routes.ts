import { Router } from "express";
import favouriteController from "./favourite.controller";




const router=Router()


//1. create one.
router.post("/",favouriteController.Togglefavourite)




const favouriteRoute=router
export default favouriteRoute  