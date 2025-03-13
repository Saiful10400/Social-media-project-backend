import { Router } from "express";
import pageController from "./page.controller";

const router=Router()
// create page.
router.post("/create",pageController.createPage)

// update page.
router.put("/update/:id",pageController.updatePage)

// auser all page. also give invitation (?invitation=false/true)
router.get("/:id",pageController.auserAllPage)

// create a user instance (invite.)
router.post("/invite",pageController.invite)

// accept invitation.
router.put("/invite/:id",pageController.modifyInvite)

// a page details
router.get("/details/:id",pageController.aPageDetails)

// a page members
router.get("/members/:id",pageController.aPageAllMembers)


//## page post related apis.

// get a page all posts.
router.get("/posts/:id",pageController.aPageAllPosts)



const PageRoutes=router
export default PageRoutes 



// 1. create page(post)
// 1.4 get page(get)
// 2. invite friend (post) pageuser
// 3. get invitation(get) pageuser (user specific)
// 5. modify nvitation(put) page user