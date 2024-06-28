// import mongoose from "mongoose"
// import  jwt  from "jsonwebtoken"
// import bcrypt from "bcrypt-nodejs"
// import { Video } from "./video.model.js"


// //agar searching avha karna chahte ho to indexing true kardo 
// const userSchema = new mongoose.Schema({
//     watchHistory:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Video" //maintain an array of the videos watched by the user
//     },
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         trim:true,
//         index:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         trim:true
//     },
//     fullName:{
//         type:String,
//         required:true,
//         trim:true,
//         index:true
//     },
//     avatar:{
//         type:String,//cloudnary url will be used here
//         required:true
//     },
//     coverImage:{
//         type:String
//     },
//     password:{ //password should be stored in hash code , encrypted format
//         type:String,
//         required:[true,'Password is required']
//     },
//     refreshToken:{   //these are used to maintain the session
//         type:String,
//         required:true
//     }
// },{timestamps:true})//created at and updated at
// //automatically mil jaega )



// //directly encrypting and storeing is quite hectic so we need to take help from mongoose hooks(hooks are function)
// //pre hook is a middle  ware  jaise hi data save hone ja
// //raha hoga just usse pehele , ye hook run karwa sakte hai usse pehele save
// //hone se pehele
// //below is the way to run it


// userSchema.pre("save",async function(next){
//     if(this.isModified("password")){
//         //excryption also takes time so we need to await as well
//     this.password =await bcrypt.hash(this.password,10)     //first arg is pass, 2nd pass is rounds
//     next() //jab mai password field ka modification bheju tabhi isko run karna hai,
//             //agar password modification nai hai to run mat karo,then it saves the password as well
// }})
// //this is not a good way as arrow function does not know the context , it takes time so make it async
// //iska kam hai jabhi bhi data save ho raha ho usme se password field ko lo encrpt karke
// //save kardo



// //bcrypt does a lot of task behind the scene , now we will need to add  lot
// //of methods which will taki jab ha, user to import karway usse puch le password sahi hai ki nai
// //kyolki db me encrypted save hai aur user jo bahar bhejega vo hoga 1234
// //mongoose gives us lots of methods , so we can make methods as well like middleware
// //how to make custom methods



// //next install bcrypt js or bcrypt
// //npm i bcrypt
// //both has same work
// //it is a .library which helps us to hash our password
// userSchema.methods.isPasswordCorrect = async function(password){
// return await bcrypt.compare(password,this) //used for comparison takes time so make ut await
// }


// userSchema.methods.generateAccessToken=function(){//JWT ke pass sign methods hai jo generate kar deta hai token
//     return jwt.sign({   //hamare pas already chize stored hai database me aur iske pass access hai this ka to ye db se utha lega
//         _id: this._id,
//         email:this.email,
//         username:this.username,
//         fullName:this.fullName
//     },process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn:ACCESS_TOKEN_EXPIRY
//     })
// }
// //so we have now stored this things into the database


// //has same implementation as that of the access token function but it has less details
// userSchema.methods.generateRefreshToken=function(){
//     return jwt.sign({   //hamare pas already chize stored hai database me aur iske pass access hai this ka to ye db se utha lega
//         _id: this._id,
//         emial:this.email,
//         username:this.username,
//         fullName:this.fullName
//     },process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn:ACCESS_TOKEN_EXPIRY
//     })
// }

// //JWT is bearer token means: jo usko bear karta hai usko ham sahi man lete hai
// //means ye token jiske bhi pas hai mai isko data bhej dunga

// //next we need to install jwt (json web token)
// //it is based on cryptography which makes token
// //these tokens are usually encrypted
// //JWT.io it has three parts headers , next we have payload(data) , and then we have verification signature
// //JWT and bcrypt is needed in every project
// //session and cookies hamd dono use kar rahe hai to access token database me store nai hoga lekin refresh toke vo database
// //me ham store karenge

// //aap ko jitne methods chahiye aap unko schema me inject kar sakte ho

// export const User = mongoose.model('user',userSchema)//mongo db me users nam se save hoga

import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 1)
    next()
})
// console.log("hashing done")

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
// console.log("password correction done")

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
// console.log("token generated")
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
// console.log("toke refreshed")

export const User = mongoose.model("User", userSchema)