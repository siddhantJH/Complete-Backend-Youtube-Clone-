//now we will make routes for the user 
import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js"



//now hamne chizo ko segregate kar diya hai 
const router=Router()
// console.log("ran")
//these are methods which we are writing to user ke bad jo bhi method likhe jaenge vo yaha aaega aur 
//accordingly call hoga 
//agar /register hit hoga to we wil call this 
router.route("/register").post(registerUser)//here we will write post (this is a post method not get so in the postman use POST not GET)

// router.route("/login").post(login)//here we will write post 

export default router




