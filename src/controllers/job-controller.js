import {Job} from '../models/job_model.js';

export const create_job =async(req,res) =>{
    try{
        const { title,description,requirements ,salary,location,jobType,experience,companyId,position } = req.body;
        if(!title ,!description || !requirements || !salary || !location || !jobType || !experience  ||!companyId || !position){
            return res.status(404).json({
                message:"something is missing",
                success: false
            })
        }
        const userId = req.id;
        const job = await Job.create({
            title,
            description,
            requirements : requirements.split(","),
            salary,
            experienceLevel : experience,
            location,
            jobType,
            position,
            company : companyId,
            created_by: userId 
        })
        return res.status(201).json({
            message: "Successfully created a new job",
            job,
            success: true,
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "something went wrong in controller layer",
            success: false
        })
    }

}

export const getAllJobs = async(req,res) =>{
    try{
        const keyword = await req.query.keyword || "";
        const query ={
            $or:[
                {title :{$regex : keyword, $options: "i"}},
                {description :{$regex:keyword,$options: "i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path : "company"
        }).sort({createdAt:-1})
        
        if(!jobs){
            return res.status(404).json({
                message:"JOB NOT FOUND",
                success: false
            })
        }
        return res.status(201).json({
            jobs,
            message: true,
        })
       
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong in controller layer",
            success: false
        })
    }
}

export const getJobById = async(req,res)=>{
    try{
      const jobId = req.params.id;
      const job = await Job.findById(jobId);
      if(!job){
        return res.status(404).json({
            message:"Jobs not found ",
            success: true
        })
      }

      return res.status(200).json({job,success:true})
    }catch(error){
        console.log(error);
    }
}

// now for recruiter like what jobs he posted

export const getAdminJobs = async(req,res)=>{ 
     try{
       const adminId = req.id;
       console.log(adminId);
       const jobs = await Job.find({created_by :adminId});
       if(!jobs){
        return res.status(404).json({
            message:"Jobs not found ",
            success: true
        })
       }
       return res.status(201).json({
         jobs,
         success:true
       })
     }catch(error){
        throw error;
     }
}