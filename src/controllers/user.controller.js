//since we are writing controller now we know that we need to use the helper fucntion(async handler)
//this helps us wiritng the abundant code , acts as a wrapper 


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

//this will register user,use asynchandler
const registerUser=asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"hello"
    })
    //now we will properly try to register the user
    //we will do it by breakdown
    // step1)
    //get user details from frontend (we do this using postman what all details i will take depends on the user model)
    //step2
    // then we will validate the data(not empty)
    //step 3
    //check if user already exist or not email,username
    //step 4
    //check for images and check for avatar
    //step 5
    //upload them to cloudinary (we have made a utility for it then res jo return hua hai usse url nikalo)
    //step 6
    //then create user object kyoki mongo db me jab object bhejumge to object bannae ke bad we will do creation call
    //step 7
    //resposne me jo bhi create hua hai vo bhi mil jata hai to vo front end me bhejo password aur refresh token hatakar
    //step 7
    //check for user creation whether the abovse res is null or user object (return accoridng to that user data or error)
    //data kahi se bhi aa sakt ahi ham assume karte hai req.body se aara hai
    //body se bhi bhej sakte hai aur params se bhi bhej sakte hai
    //xform se bhi bhej sakte hai (url encoded hai)
    //file bhejme ko option nai hai , ham raw data b hejenge (means sidha json bhejo)
    const {fullName,email,username,password}=req.body
    if([fullName,email,username,password].some((field)=>{
        return field?.trim()===""?false:true;
    }))
        {
            throw new ApiError(400,"fullname is required")
        }

    //now we need to check that user exist or not now ye imported user variable mongoose se direct connect kar sakta hai
    //because it was created usign mongoose
   const existedUser = User.findOne({
        $or:[email,username]  //ye $or operatir pe array assign kardo to ye sari check hoga db me exist karti hai ya nai
    }) //returns the first founded user

    if(existedUser)
    {
        throw new ApiError(409,"User with email or username already exist")
    }

    //now we need to check the images and avatar for that we have already used the multer
    //and htes emiddleware onmlymodify the req.body and add new fields in it
    //req.body ka access hame express ne diya hai multer hame req.files ka access deta h
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImage=req.files?.coverImage[0]?.path;
})
export {registerUser}
//next we need to create the routes , now when to run this methood this will run when a url will hit 
//we make seprate folder for it named as routes