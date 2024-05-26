import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //iska kam bas itna hai ki mai apne server se user ki browser ki cookie access kar pau aur set lar pau
                                        //sometime we can keep secure cookie int the broser and only server can read it
const App=express()



//how to confogiure each
App.use(cors({
    origin:process.env.CORS_ORIGIN, //allow data to come from any where
    credentials:true
}))//use to configure midleware



//data kahi se bhi aa skata hai data basckend me json, url, body etc
App.use(express.json({limit:"16kb"})) //means mai json ko accespt kar raha hu limit updo 16kb only,
                                        //multer allow file uploading facility


//what is url se data aae
App.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))

App.use(express.static("public")) //when we want to store file in server or images or favicon


//since cookie parser is a configuration so we will still use the
//App.use()
App.use(cookieParser()) //can also pass option inside using object


//cooie parser
//cors
//middle ware app.user() ke through karte hai




export default App  //we made the app and we exported it now in index we need to make somechanges and use this App
                    //if we just use export {App} we need not have to to use  the import
                    //req and res
                    //req: se jo bhi data aata hai vo usually req.params se aatta hai
                    //req.body() alag alag tarah se data aa sakta hai
                    //url ke andat question marks search equals etc
                    //req.body alag alag tareh se data aa skat ahi forms aur json : config karni padti hai
                    //req.parser: when using a cookie parser middleware




//middleware:  when clients hits /instagram  server ke pas req (err,req,res,next) then may res.json() karke lauta dunga
                //it is straight forward process now i want to know kya server response ko lene ke liye capable hai ki nia
                //like aapne login nai kiya hoga , so something will run in middle (middleware),
                //middle ware loginc could be of various types , login check, admin ho ya nai , there is seq to run the middleware
                //(err,req,res,next) next means you are talking about middle ware this (err,req,res,next) is present in each middle ware
                //har middle ware ka kam jab ho jaega to next karke next ko pass kar dega,this same box is called middleware
                //next means ham middle ware ke bare me bat kar rahe hai to next flag pass hota hai, sab next use karega        