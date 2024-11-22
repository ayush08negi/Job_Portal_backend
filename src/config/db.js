import mongoose from "mongoose";
import { MONGO_URL } from "./server_config.js";

const connectDB = async()=>{
     try{
       mongoose.connect(MONGO_URL)
       console.log('mongodb connected')
     } catch(error){
        console.log(error);
        throw error;
     }
}

export default connectDB