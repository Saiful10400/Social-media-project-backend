import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import paymentRoute from "../Modules/Payment/payment.routes"
import followRoute from "../Modules/Following/following.routes"
import postRoute from "../Modules/post/post.routes"
import reactionRouter from "../Modules/Reaction/reaction.routes"
import paymentHistoryRoute from "../Modules/UserPayment/UserPayment.routes"


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
        path:"/payment-history",
        route:paymentHistoryRoute
    }
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes