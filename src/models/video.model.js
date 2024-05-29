import mongoose, { Mongoose } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";



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
        type:Number,//given by cloud nary itself
        required:true
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    }
},{timestamps:true})



videoSchema.plugin(mongooseAggregatePaginate) //we can add plugin as well and add the paginate
export const Video=mongoose.models('video',videoSchema)



//saving the watch histroy itself in the code is making this code complex and next level
//so we need to have an aggreegation pipeline for that to work property
//for that we will use mongoose-aggregate : it allows us to write aggregation queries
//first install PS C:\Users\SIDHANT\Desktop\youtubeClone> npm i mongoose-aggregate-paginate-v2
//then import inside the schema


//next install bcrypt js or bcrypt
//npm i bcrypt
//both has same work
//it is a .ibrary which helps us to hash our password