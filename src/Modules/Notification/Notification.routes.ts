import { Router } from "express";
import noticontroller from "./Notification.controller";





const router=Router()


//1. get one.
router.get("/:id",noticontroller.getNoti) 

//2. get all notification.

router.get("/",noticontroller.getAllNotification)
//2. make all notification read.
router.put("/make-read/:id",noticontroller.makeAUserAllRead)

//3. delete a notification.
router.delete("/:id",noticontroller.deleteANotification)




const NotificationRoute=router
export default NotificationRoute 