import { Router } from "express"
import authenticationRoutes from "../Modules/Authentication/authentication.routes"
import paymentRoute from "../Modules/Payment/payment.routes"
import followRoute from "../Modules/Following/following.routes"

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
]

moduleRoutes.forEach(item=>routes.use(item.path,item.route))





export default routes