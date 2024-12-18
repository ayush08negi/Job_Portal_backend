import express from 'express'
import cookieParser  from 'cookie-parser';
import cors from 'cors'
import  { PORT , MONGO_URL }  from './config/server_config.js'
import connectDB from './config/db.js';
import userRoute from './routes/user-routes.js'
import companyRoute from './routes/company-routes.js'
import JobRoute from './routes/job-routes.js'
import applicationRoute from './routes/applicaton-route.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",JobRoute);
app.use("/api/v1/application",applicationRoute)
app.listen(PORT, () =>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})

