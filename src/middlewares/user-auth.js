import jwt from 'jsonwebtoken';
import {JSON_KEY} from '../config/server_config.js'


const isAuthenticated = async(req, res, next)=>{
      try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not authenticated",
                success: false,
            })
        }
        const decode = await jwt.verify(token , JSON_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }
        req.id = decode.userId;
        next();
        
      } catch(error){
        console.log(error);
      }
}

export default isAuthenticated;