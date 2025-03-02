import mongoose from "mongoose";
import config from "./config"
import { server } from "./Modules/Socketio";



async function main(){
    try{
        await mongoose.connect(config.url as string,{dbName:"Apollo-assignment-6"})
        server.listen(config.port,()=>{
            console.log(`this server is running at http://localhost:${config.port} port.`)
        })
    }
    catch(err){
        console.log(err)
    }
}

main() 