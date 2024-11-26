import {Company} from '../models/company_model.js'

export const registerCompany = async(req,res)=>{
    try{
       const { companyName } = req.body;
       if(!companyName){
          return res.status(400).json({
            message:"company name is requires",
            success: false
          })
       }

       let company = await Company.findOne({name:companyName});
       if(company){
          return res.status(400).json({
             message : "can't register same company",
             success : false
          })
       }

       company = await Company.create({
           name : companyName,
           userId : req.id,
       })

       return res.status(201).json({
         message: 'Company registered successfully',
         company ,
         success: true,
       })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message:"can't able to register ",
            success: false,
        })
    }
}

export const getCompany = async(req,res) =>{
    try{
      const userId = req.id; // logged in userid to permmit only user compnay not others
      const companies = await Company.find({userId});
      if(!companies){
         return res.status(404).json({
             message:"Companies not found",
             success: false
         })
      }
      return res.status(201).json({
         companies,
         success:true,
      })
    }catch(error){
        console.log(error);
    }
}

export const getCompanyById = async(req,res)=>{
    try{
      const companyId = req.params.id;
      const company = await Company.findById(companyId);
      if(!company){
        return res.status(404).json({
            message:"Companies not found",
            success: false
        })
      }
      return res.status(200).json({
         company,
         success: true,
      })
      
    } catch(error){
        console.log(error);
    }
}

export const updateCompany = async(req,res)=>{
     try{
       const {name, description, website , locaiton} = req.body;
       const file = req.file
       // idhar cloudnary aayeaga

       const updatedata = {name, description, website , locaiton} ;
       const company = await Company.findByIdAndUpdate(req.params.id , updatedata, {new : true});

       if(!company){
         return res.status(404).json({
            message:"Compnay not found",
            success: false
         })
       }

       return res.status(201).json({
         company,
         message: "company information updated",
         success: true,
       })
     }catch(error){
        console.log(error);
     }
}