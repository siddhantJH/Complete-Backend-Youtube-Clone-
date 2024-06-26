import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";
import {User} from "../models/user.model.js"

const connectDB = async()=>{  //since ye acynchronous methos hai to ue promise
                            //bhi return karta hai to jaha aap ise call karenge waha aapko promise store karna hoga
    try{
        const connectionInstance=await mongoose.connect(`mongodb+srv://Siddhant:Siddhant12@backendcluster.rrmk5bs.mongodb.net/?appName=BackendCluster/${DB_NAME}`) //mongoose return us instance of the response
        console.log(`\n Mongo Db connection !! DB Host: ${connectionInstance.connection.host}`)//run and gives us lots of knowledge
    }catch(error)
    {
        console.log("Mongo Database error is",error)
        process.exit(1) //current application jpo chal rahi hai us process ko exit bhi kara sakte ho 
    }
}


export default connectDB