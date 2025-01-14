import { Router } from "express";
import CategoryController from "./Category.controller";
import noticontroller from "../Notification/Notification.controller";


const router=Router()


//1. Category routes.
router.get("/",CategoryController.getAllCategory) 

router.get("/admin-credentials",noticontroller.dashboardCredentials) 

//2. delete category.
router.delete("/:id",CategoryController.deleteCategory)


const CategoryRoutes=router
export default CategoryRoutes  