import { User } from '../models/user_model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JSON_KEY} from '../config/server_config.js'

export const signup = async(req,res)=>{
    try{
       const { fullname , email , phoneNumber , password, role} = req.body;
       if(!fullname || !email || !phoneNumber || !password || !role ){
        return res.status(400).json({
           message:"Something is missing ",
           success: false,
        });
      };
          const user = await User.findOne({email});
          console.log("user",user);
          if(user){
            return res.status(400).json({
                message:'User already exists with this email ',
                success: false,
            })
          }
          const hashedPassword = await bcrypt.hash(password , 10);

          await User.create({
             fullname,
             email,
             phoneNumber,
             password: hashedPassword,
             role
          })

          return res.status(201).json({
             message:'Account created successfulle',
             success:true,
          })
    }catch(error){
        console.log("error",error)
       return res.status(500).json({
           success:false,
           err:error,
           data:{}
        })
    }
}

export const login  = async(req,res) =>{
     try{
        const {email , password , role } = req.body;
        if(!password || !email || !role ){
            return res.status(400).json({
               message:"Something is missing ",
               success: false,
            });
          };
          
          //check in user database if user of this email is exists or not 
          let user = await User.findOne({email});
          if(!user){
            return res.status(400).json({
                message:'Incorrect email  ',
                success: false,
            })
          }

          const isPasswordMatch = await bcrypt.compare( password , user.password);
          if(!isPasswordMatch){
            return res.status(400).json({
                message:'Incorrect password ',
                success: false,
            })
          };

          //check role is correct or not 
          if(role != user.role){
            return res.status(400).json({
                message:"Account doesn't match with current role",
                success: false
            })
          }
           
          const tokenData = {
             userId : user._id
          }
          const token = await jwt.sign(tokenData , JSON_KEY , {expiresIn : '1d'});

          user = {
              _id : user._id,
              fullname : user.fullname,
              email : user.email,
              phoneNumber : user.phoneNumber,
              role:user.role,
              profile:user.profile
          }
          return res.status(200).cookie("token", token , {maxAge:1*24*60*60*1000 ,httpsOnly:true, sameSite : 'strict'}).json({
              message:`welcome back ${user.fullname}`,
              user,
              success:true
          })
     } catch(error){
         console.log(error) ;
     }
}

export const logout = async(req,res)=>{
    try{
       return res.status(200).cookie("token","", {maxAge: 0}).json({
         message:"Logged out successsfully",
         success:true,
       })
    } catch(error){
        console.log(error);
    }
}

export const updateProfile = async(req,res)=>{
     try{
        const {fullname , email , phoneNumber, bio , skills } = req.body;
        
        let skillsArray;
        if(skills)  skillsArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray
        
        await user.save();
        
        //creating new user
        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(201).json({
            message:"Profile updated succesfully",
            user,
            success:true
        })

     } catch(error){
        console.log(error);
     }
}