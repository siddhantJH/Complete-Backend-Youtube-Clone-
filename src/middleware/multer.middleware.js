
import multer from "multer" //it will be used to upload the file from the user and then store it in a server(our server)
                            //for this we will use multer but, then from our server if we want to store it in the cloud
                            //we need cloudinary.
import express from "express"; // Import express




// Custom storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp"); // Set the destination for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original name of the file as filename
    }
});

// Create an instance of multer with the custom storage configuration
export const upload = multer({ storage });

//now inorder to use it what we can do is

//this is not utiliy but a middleware
//next this is the middleware made using middleware "jaha jaha file upload ki capability chahiye use inject kar dunga"
// import express from "express";
// import multer from "multer";

// const app = express();
// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.single("file"), (req, res) => { //this middle argument is what we call a middleware we get the upload fonfiguration fromt he multer
//     // Handle file upload here
// });

//first argument is the route 
//second argument is middleware 
//third argument is  (controllder)



//now before movinf further make a detailed notes of all the things done till now 
//and do some javascript revision 