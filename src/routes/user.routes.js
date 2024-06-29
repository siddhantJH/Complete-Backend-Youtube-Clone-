//now we will make routes for the user 
import {Router} from "express"
import { loginUser, registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"  //it runs in between, jane se pehele milke jana


//now hamne chizo ko segregate kar diya hai taki managable ho jae
const UserRouter=Router()
// console.log("ran")
//these are methods which we are writing to user ke bad jo bhi method likhe jaenge vo yaha aaega aur 
//accordingly call hoga 
//agar /register hit hoga to we wil call this 
//pass a middleware function in the post function itself
//registerUser execute karne se pehele ye middle ware use karo
//router mai aapko aik route batata hu /register lekin ab jo karna hai(get , post...etx) vo aap dot laga kar use kar sakte ho
//ab post me kaumn sa method run hona chahiye bo mention karo post ke andar
///Users/register to ye call ho jaega 
//to ab agar mujhe login method banana hai to simply mai /login mention karke aik naya router bana dunga 
// app.js me koi changes nai karna padega , file clumsy nai hoti hai
UserRouter.route("/register").post(upload.fields([{
    //since we are accepting two files so we will accept two obj
    name:"avatar",
    maxCount:1,
},{
    name:"coverImage",
    maxCount:1,
}]),registerUser)


//login
UserRouter.route("/login").post(loginUser)

//now ham images bhej paenge
//here we will write post (this is a post method not get so in the postman use POST not GET)
//router.route("/login").post(login)//here we will write post 
//to do file handling first import the multer middleware
export default UserRouter




