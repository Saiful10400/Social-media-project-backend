import { Router } from "express";
import noticontroller from "./Notification.controller";





const router=Router()


//1. get one.
router.get("/:id",noticontroller.getNoti) 


const NotificationRoute=router
export default NotificationRoute 