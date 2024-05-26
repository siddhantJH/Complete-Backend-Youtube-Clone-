import mongoose, { Mongoose } from "mongoose";
//.model is writeen only for personal convention
const videoSchema=new mongoose.Schema({
    videoFile:{
        type:String,
        required:true,
        index:true
    },
    thumbnail:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
    },
    views:{
        type:Number
    },
    isPublished:{
        type:Boolean,
    }
},{timestamps:true})

export const Video=mongoose.models('video',videoSchema)