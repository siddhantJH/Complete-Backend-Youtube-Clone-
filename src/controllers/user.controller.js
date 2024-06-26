//since we are writing controller now we know that we need to use the helper fucntion(async handler)
//this helps us wiritng the abundant code , acts as a wrapper 


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"


//this will register user,use asynchandler
const registerUser=asyncHandler(async (req,res)=>{
    // console.log(req.body) //this is a json object which we have received as a req
    // console.log(req.files)
    // res.status(200).json({
    //     message:"hello"
    // })
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
    if([fullName,email,username,password].some((field)=>
       field?.trim()===""))
        {
            throw new ApiError(400,"All fields are required")
        }
    
    //now we need to check that user exist or not now ye imported user variable mongoose se direct connect kar sakta hai
    //because it was created usign mongoose
   const existedUser = User.findOne({
        $or:[{email},{username}]  //ye $or operatir pe array assign kardo to ye sari check hoga db me exist karti hai ya nai
    }) //returns the first founded user

    if(existedUser)
    {
        throw new ApiError(409,"User with email or username already exist")
    }

    //now we need to check the images and avatar for that we have already used the multer
    //and htes emiddleware onmly modify the req and add new fields in it
    //req.body ka access hame express ne diya hai multer hame req.files ka access deta h
    //hamne dono file ka local path var me store kar liya hai
    //ye honge nai honge no garantee (check avatar as it is required)
    const avatarLocalPath=req.files?.avatar[0]?.path;
    if(!avatarLocalPath)
        {
            return new ApiError(400,"avatar required compulsary")
        }
    const coverImageLocalPath=req.files?.coverImage[0]?.path;
    //now we need to upload it on cloudinary

    const avatar=await uploadOnCloudinary(avatarLocalPath);//success ke case me ham file delete nai karwa rahe bulki sirf url bhej rahe hai (delete karwana zaruri hai)
    const coverImage=await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"avatar is needed")
    }
    const user=await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    //mondo add _id on each entry
    //the advantage of this is we can chain , .select karke 
    //we can choose field , we pass 
    //we pass a string inside this 
    //yaha par ham ye likhte hai kya kya nahi chahiye
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})
export {registerUser}
//next we need to create the routes , now when to run this methood this will run when a url will hit 
//we make seprate folder for it named as routes