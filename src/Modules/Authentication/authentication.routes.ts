import { Router } from "express";
import authenticationController from "./authentication.controller";
import zodValidation from "../../MiddleWare/zodValidation";
import authenticationValidationSchema from "./authentication.validation";
import auth from "../../MiddleWare/auth";

const router=Router()
//7. get all user
router.get("/all-user",authenticationController.getAllUser)
// 1. signup route.
router.post("/signup",zodValidation(authenticationValidationSchema.signup),authenticationController.signup)
//2. login route.
router.post("/login",zodValidation(authenticationValidationSchema.login),authenticationController.login)
//3. get logged in user data.
router.get("/getCurrentUser",auth(["user","admin"]),authenticationController.getCurrentUser)

//4.check email and user name.
router.post("/checkCredentials",authenticationController.checkCredentials)

//4.last password val.
router.post("/lastPassVal",authenticationController.validateLastPasswod)

//5.change password.
router.post("/changePassword",authenticationController.changePassword)

// 6. get a single profile data.

router.get("/:id",authenticationController.getASingleProfileData)

// 6. get a single profile data.

router.put("/:id",zodValidation(authenticationValidationSchema.UpdateUser),authenticationController.updateAProfile)




// export the module.
const authenticationRoutes=router
export default authenticationRoutes 