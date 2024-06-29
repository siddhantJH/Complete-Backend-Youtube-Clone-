import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //iska kam bas itna hai ki mai apne server se user ki browser ki cookie access kar pau aur set lar pau
                                        //sometime we can keep secure cookie int the broser and only server can read it
const App=express()

//data can come int the backend in various ways and techniques 
//like url , json , body, form , direct form , json form 
//like that we need to limit the a amount of json or other data  that is coming to my backend 
//so to configure all that we need to use middleware the app.use 






//how to confogiure each
App.use(cors({
    origin:process.env.CORS_ORIGIN, //allow data to come from any where
    credentials:true
}))//use to configure midleware



//data kahi se bhi aa skata hai data backend me json, url, body etc
//limit the coming of the json
//earlier the express was not able to accept the json parser we had to use the body parser for that
//but now body parser ka kam express me aa gaya hai
//but bht sare code base me use hota hia body parser
App.use(express.json()) //means mai json ko accespt kar raha hu limit upto 16kb only,
                                        //multer allow file uploading facility


//configure the backend to accept data from the url ,what if url se data aae
//now there might be some issue when data comes form url
//url ka encoder hota hia apna apna, aur url ka sppace %20 encoded hota hai to
//aapko express ko batana padega encoding
//extended mean aap object ke andar bhi object de sakte ho
App.use(express.urlencoded({
    extended:true
}))



//jab hame kuch files aur folder store karna chahta hu to publi folder asset banate hai ham
//why do we keep it
App.use(express.static("public")) //when we want to store file in server or images or favicon


//since cookie parser is a configuration so we will still use the
//App.use()
//mai mere server user ka browser ka cookie access kar pao aur crud operation
App.use(cookieParser()) //can also pass option inside using object

//routes are also defined here
//importt the router and user-routes(function) here 
import UserRouter from "./routes/user.routes.js"
//when we declare routes we follow some good practice , we do app.get
//we were use app.get ye ham tba bolte the jab router export nahi kar rahe the 
//ham app.get se kam kar pa rahe the kyoki ham app ke through yahi routes likh rahe the 
//yahi pe aap controllers likh rahe the ,lekin since aapne ab chize seprate kar di hai 
//router ko app alag rakh liye ho to ab router ko lane ke liye middleware lana padega 
//compulsary hai this is the syntaxso we will use app.use 
//now you might think that as soon as user clicks on the url or endpoint we will run the user controller
//but that is not what we do , the reason is
//previoulsy we were using app.get and it was working well the reason is
//we were not importing any of the controller , app ke through yahi routes likhre the yahi controller likh rahe the
//now since router ko app alag le gae ho to ab router ko lane ke liye middleware lana padega
//aap jo bhi yaha par doge vo ho jata hai prefix , ie local host :8000/users to aapka control chal jata hai Userrouter ko
App.use("/users",UserRouter)//koi bhi /users run karega to ye controller call ho jaega,whenever anyone comes to this it will not handle it
//it will give the control to router, jo router activate karwana hai vo second arg lkh do 

//now the url will look something like this
// https::localhost:8080/users/register
// https::localhost:8080/users/login
//ab agar aapko naya routes likhna hai you dont have to import it you can directly go to tge file in user.routes and define it there








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