// //since we are writing controller now we know that we need to use the helper fucntion(async handler)
// //this helps us wiritng the abundant code , acts as a wrapper 


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"


// //this will register user,use asynchandler
// const registerUser=asyncHandler(async (req,res)=>{
//     // console.log(req.body) //this is a json object which we have received as a req
//     // console.log(req.files)
//     // res.status(200).json({
//     //     message:"hello"
//     // })
//     //now we will properly try to register the user
//     //we will do it by breakdown
//     // step1)
//     //get user details from frontend (we do this using postman what all details i will take depends on the user model)
//     //step2
//     // then we will validate the data(not empty)
//     //step 3
//     //check if user already exist or not email,username
//     //step 4
//     //check for images and check for avatar
//     //step 5
//     //upload them to cloudinary (we have made a utility for it then res jo return hua hai usse url nikalo)
//     //step 6
//     //then create user object kyoki mongo db me jab object bhejumge to object bannae ke bad we will do creation call
//     //step 7
//     //resposne me jo bhi create hua hai vo bhi mil jata hai to vo front end me bhejo password aur refresh token hatakar
//     //step 7
//     //check for user creation whether the abovse res is null or user object (return accoridng to that user data or error)
//     //data kahi se bhi aa sakt ahi ham assume karte hai req.body se aara hai
//     //body se bhi bhej sakte hai aur params se bhi bhej sakte hai
//     //xform se bhi bhej sakte hai (url encoded hai)
//     //file bhejme ko option nai hai , ham raw data b hejenge (means sidha json bhejo)
//     const {fullName,email,username,password}=req.body
//     if([fullName,email,username,password].some((field)=>
//        field?.trim()===""))
//         {
//             throw new ApiError(400,"All fields are required")
//         }
    
//     //now we need to check that user exist or not now ye imported user variable mongoose se direct connect kar sakta hai
//     //because it was created usign mongoose
//     //we were constantly getig the errror of 
//     // {
//     //     "statusCode": 500,
//     //     "success": false,
//     //     "errors": "User with email or username already exist"
//     // }
//     //there is somethisng wron with the code 
//     // Still there is error
//    const existedUser =await User.findOne({email}) //returns the first founded user
//     if(existedUser)
//     {
//         throw new ApiError(409,"User with email or username already exist")
//     }

//     //now we need to check the images and avatar for that we have already used the multer
//     //and htes emiddleware onmly modify the req and add new fields in it
//     //req.body ka access hame express ne diya hai multer hame req.files ka access deta h
//     //hamne dono file ka local path var me store kar liya hai
//     //ye honge nai honge no garantee (check avatar as it is required)
//     const avatarLocalPath=req.files?.avatar[0]?.path;
//     if(!avatarLocalPath)
//         {
//             return new ApiError(400,"avatar file required compulsary")
//         }
//     const coverImageLocalPath=req.files?.coverImage[0]?.path;
    
//     //now we need to upload it on cloudinary
//     const avatar=await uploadOnCloudinary(avatarLocalPath);//success ke case me ham file delete nai karwa rahe bulki sirf url bhej rahe hai (delete karwana zaruri hai)
//     const coverImage=await uploadOnCloudinary(coverImageLocalPath)
//     if(!avatar){

//         throw new ApiError(400,"avatar is needed")
//     }
//     //create a user object which you want to store on the mongo db database
//     //entry in database is done using the USer it is talking to the database 
//     //.create takes a object and whatever you want to pas to that pass it 
//     const user=await User.create({
//         fullName,
//         avatar: avatar.url, //cloudinary sends us the response so we need only url form inside of it 
//         coverImage:coverImage?.url || "",//if cover image is not present so we can store "" also using || operator 
//         email,
//         password,
//         username:username.toLowerCase()
//     })
//     //mondo add _id on each entry
//     //the advantage of this is we can chain , .select karke 
//     //we can choose field , we pass 
//     //we pass a string inside this 
//     //yaha par ham ye likhte hai kya kya nahi chahiye
//     //hame pura object milega but hame usme se sirf necessary items hi chahiye 
//     //mongo db har entry ke sath aur bhi chize add karta hai like _id and _encrypted password
//     const createdUser=await User.findById(user._id).select(
//         "-password -refreshToken "
//     )
//     if(!createdUser){
//         throw new ApiError(500,"Something went wrong while registering the user")
//     }
//     return res.status(201).json(
//         new ApiResponse(200,createdUser,"User registered successfully")
//     )
// })
// export {registerUser}
// //next we need to create the routes , now when to run this methood this will run when a url will hit 
// //we make seprate folder for it named as routes


// import { asyncHandler } from "../utils/asyncHandler.js";
// import {ApiError} from "../utils/ApiError.js"
// import {User} from "../models/user.model.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken"
// import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {
    // console.log(req.body)
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {fullName, email, username, password } = req.body
    //console.log("email: ", email);

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    // console.log(existedUser)
 
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log(req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path; //isme error aa sakti hai undefined variable wali agar hamne nai bheja coverimage to 
    let coverImageLocalPath;
    //check if req.files aai hai ya nai , Array.isArray:what it does is it tells us ki properly hamare pas array aya hai ya nai 
    //req.file.coverImage agar ye array hai ya nai aur uski len 0 se jyada hai ya nai 
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path //oth element se path nikalo 
    }
    // console.log(avatarLocalPath,coverImageLocalPath)

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required error in LocalPath")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // console.log(avatar,coverImage)
    if (!avatar) {
        throw new ApiError(400, "Avatar file is required error in cloudinary url ")
    }
   
    // console.log("we are here 1",fullName,avatar.url,coverImage.url,email,password,username)
    let user
try {
    user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  console.log("User created successfully:", user);
} catch (error) {
  console.error("Error creating user:", error);
  // Handle the error appropriately, e.g., log more details or send an error response
}




    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // console.log(user)

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

} )

const loginUser = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    // console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedToken?._id)
    
        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
            
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body

    

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails = asyncHandler(async(req, res) => {
    const {fullName, email} = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email: email
            }
        },
        {new: true}
        
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler(async(req, res) => {
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: avatar.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Avatar image updated successfully")
    )
})

const updateUserCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    //TODO: delete old image - assignment


    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on avatar")
        
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
})


const getUserChannelProfile = asyncHandler(async(req, res) => {
    const {username} = req.params

    if (!username?.trim()) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelsSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id, "$subscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelsSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1

            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(404, "channel does not exists")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
    )
})

const getWatchHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project: {
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields:{
                            owner:{
                                $first: "$owner"
                            }
                        }
                    }
                ]
            }
        }
    ])

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch history fetched successfully"
        )
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory
}