import mongoose from "mongoose";
import fs from "node:fs";
import app from "./express.js";


const mongodbPassword = fs.readFileSync("/Users/willytetka/Desktop/mongodbpassword.txt", "utf-8");
const mongoUri = `mongodb+srv://user:YseiLLVYN5AdGDyQ@cluster0.eg2vijf.mongodb.net/?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;



async function connection(){
    try{
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("Connected to MongoDb")

        app.listen(3002, (err)=>{
            if(err){
                console.log(err)
            }  
            console.log("Server start at port 3002")

        })
    }catch(err){
        console.log("Unable to connect");
    }
}


connection();