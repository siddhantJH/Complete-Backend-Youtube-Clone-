//files hamare pas aaegi file system ke through means server pe upload ho gai hai , 
//ye koi bhi use karega to hame loacl file(server par stored) ka path dega, means jo bhi files meri servers pe aa chuki hai
//fir mai cloudinar pe dal dunga 
//why both?: Upload file using multer from the user and store it in the local server , then using cloudnary
// store it in the cloud, atleast hamare server me aik bar file aa gai to repload ka chances bane

import {v2 as cloudinary} from 'cloudinary';
import { log } from 'console';
import { response } from 'express';
import fs from "fs"  //fs is a file system given by nodejs , it helps us read and write and remove the file 



cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_KEY 
});


const uploadOnCloudinary = async (localFilePath) =>{
    try {
       if(!localFilePath){
            return null
       }
       //upload the file on cloudinary
       cloudinary.uploader.upload(localFilePath,{
        resource_type:"auto"
       }) //we could also give a file path like file type etc
       //file has been uploaded successfully
       console.log("File uploaded successfully",response.url)
       return url
    } catch (error) {
        //now we know that the file is present int he servers file system , now we need to 
        //remove it if incase the upload fail so we need to unlink it from the server for 
        //that we will use the filesystem provided by the sevrer
        //remove from server what if it was present in the server 
        fs.unlinkSync(localFilePath)//unlink the file locally saved as the upload operation got failed
        return null
    }
}



export {uploadOnCloudinary}



//nodjs se hame fs file sytsem milta hai jo hame read, write and remove karne ke kam aat ahai sync aur async me 
//hame file ka path chahiye hota hai 
//unlink path: link and unlink functionality in the file system



