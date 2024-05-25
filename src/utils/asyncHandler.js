
//now if we consider database file so we can see that
//database se jab bhi aap bat karenge to do chiz asynx await aaya hai aur try catch lagana padega
//now since we are talking to database very frquently can't we just make a utlity file and make a wrapper 
//when we need the functionaliy
//this async handler is used to do monotonous task and make snippets of code, 

//Make a method and export it 
// const asyncHandler = ()=>{ }   

//const asyncHandler = (func)=>{()=>{}}  
//const asyncHandler = (func)=>()=>{} 
//const asyncHandler = (func)=>async (re,res,next)=>{} 


                    
//FIRST WAY
// async function is higher order ufnciton it takes function as a parameter 
const asyncHandler=(fn)=>async ()=>{
    try{
        await fn(req,res,next)   //jo function liya hai execute karo
    }catch(error){
        res.status(err.code || 500).json({
            success:false,
            message:error.message
        })
    }
}//how to maintain the error class and standarize the error message 


//SECOND WAY(promise approach)
// const asyncHandler = (requestHandler)=>{
//  return (req,res,next)=>{
//     Promise.resolve(requestHandler(req,res,next)).catch((error)=> next(err))
//  }
// }


export {asyncHandler}