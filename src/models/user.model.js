import mongoose from "mongoose";
//agar searching avha karna chahte ho to indexing true kardo 
const userSchema = new mongoose.Schema({
    watchHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:[video] //maintain an array of the videos watched by the user 
    },
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudnary url will be used here
        required:true
    },
    coverImage:{
        type:String
    },
    password:{ //password should be stored in hash code , encrypted format
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{   //these are used to maintait the session
        type:String,
        required:true
    }
},{timestamps:true})//created at and updated at automatically mil jaega )
export const User = mongoose.models('user',userSchema)//mongo db me users nam se save hoga