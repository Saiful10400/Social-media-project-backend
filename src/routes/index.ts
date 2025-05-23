import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import paymentRoute from "../Modules/Payment/payment.routes"
import followRoute from "../Modules/Following/following.routes"
import postRoute from "../Modules/post/post.routes"
import reactionRouter from "../Modules/Reaction/reaction.routes"
import paymentHistoryRoute from "../Modules/UserPayment/UserPayment.routes"
import commentRoute from "../Modules/Comment/comment.routes"
import favouriteRoute from "../Modules/Favourite/favourite.routes"
import NotificationRoute from "../Modules/Notification/Notification.routes"
import friendRoutes from "../Modules/Friend/friend.routes"
import CategoryRoutes from "../Modules/Category/Category.routes"
import PageRoutes from "../Modules/Page/Page.routes"
import storyRoutes from "../Modules/Story/story.routes"


const routes=Router()


const moduleRoutes=[
   
    {
        path:"/auth",
        route:authenticationRoutes
    }
    ,
    {
        path:"/pay",
        route:paymentRoute
    }
    ,
    {
        path:"/follow",
        route:followRoute
    }
    ,
    {
        path:"/post",
        route:postRoute
    }
    ,
    {
        path:"/reaction",
        route:reactionRouter
    }
    ,
    {
        path:"/comment",
        route:commentRoute
    },
    {
        path:"/favourite",
        route:favouriteRoute
    }
    ,
    {
        path:"/payment-history",
        route:paymentHistoryRoute
    }
    ,
    {
        path:"/notification",
        route:NotificationRoute
    }
    ,
    {
        path:"/friend",
        route:friendRoutes
    }
    ,
    {
        path:"/category",
        route:CategoryRoutes
    }
    ,
    {
        path:"/page",
        route:PageRoutes
    }
    ,
    {
        path:"/story",
        route:storyRoutes
    }
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes