import express from 'express'
import cookieParser  from 'cookie-parser';
import cors from 'cors'
import  { PORT , MONGO_URL }  from './config/server_config.js'
import connectDB from './config/db.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.listen(PORT, () =>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})

