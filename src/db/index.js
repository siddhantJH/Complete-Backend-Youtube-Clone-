import mongoose from "mongoose";
import {DB_NAME} from "../constant.js";


const connectDB =async()=>{
    try{
        const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //mongoose return us instance of the response
        console.log(`\n Mongo Db connection !! DB Host: ${connectionInstance.connection.host}`)//run and gives us lots of knowledge
    }catch(error)
    {
        console.log("Error mongo",error)
        process.exit(1) //current application jpo chal rahi hai us process ko exit bhi kara sakte ho 
    }
}


export default connectDB