//since we are writing controller now we know that we need to use the helper fucntion(async handler)
//this helps us wiritng the abundant code , acts as a wrapper 


import { asyncHandler } from "../utils/asyncHandler.js";

//this will register user,use asynchandler
const registerUser=asyncHandler(async(red,res)=>{
    // res.status(200).json({
    //     message:"ok"
    // })
    //now we will properly try to register the user
    
})
export {registerUser}
//next we need to create the routes , now when to run this methood this will run when a url will hit 
//we make seprate folder for it named as routes