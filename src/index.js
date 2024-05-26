// require('dotenv').config({path:'./env'})  //this is require and not import so we need to resolve it to maintain consistency
//we could also use this then in the script we need to make change and make the dev script : nodemon index.js
import App from './app.js'

import dotenv from "dotenv" //then config it
dotenv.config({
    path:'./env'
})//other way is to make changes in the package.json in dev script     "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
//means let me choose the expeimarntal feature

import mongoose from "mongoose"  //get mongoose variable
import express from "express"
import connectDB from "./db/index.js"
// const app =express()
//TYPE 1 go to db make index.js file


connectDB()
.then(()=>{
    //yaha pe aap app ka use karke listen karenge
    App.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    }) //agar nai mil raha port to 8000 use karlo
})
.catch((err)=>{
    console.log("Mongo DB connection failed!!!", err)
})
//when you try to run node run dev it will throw an error that we are not able to use src/db in import module
//we are importing it in this file itself ,first check import so we sometine need to use the extension, so we can see then mongo db connected
//lets try to fail db, any changes in dnv need to restart hamne db jo file likhi hai hamn async
//aur await ka use kiya hai to asynchronous methods aapko aik promise bhi return karta hai to resolve promise use .then ()



//use IFIS use semicolon for cleaning purpose (TYPE 1)
/*
;(async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)//sometime we might see that just
        //after db connection there is listener
        app.on("error",()=>{//error event used to listne to errors using express app
            console.log("Err",error)
            throw error
        });
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening to ${process.env.PORT}`)//if ypou see this means you app is working
        })
    } catch (error) {
        console.log("Error:",error)
        throw err
    }
})()*/