//now we will make routes for the user 
import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"  //it runs in between jane se pehele milke jana


//now hamne chizo ko segregate kar diya hai 
const router=Router()
// console.log("ran")
//these are methods which we are writing to user ke bad jo bhi method likhe jaenge vo yaha aaega aur 
//accordingly call hoga 
//agar /register hit hoga to we wil call this 
//pass a middleware function in the post function itself
router.route("/register").post(upload.fields([{
    name:"avatar",
    maxCount:1,
},{
    name:"coverImage",
    maxCount:1,
}]),registerUser)
//now ham images bhej paenge
//here we will write post (this is a post method not get so in the postman use POST not GET)
// router.route("/login").post(login)//here we will write post 
//to do file handling first import the multer middleware


export default router




