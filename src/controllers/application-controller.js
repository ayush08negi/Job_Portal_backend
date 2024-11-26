import {Application} from '../models/application-model.js';
import {Job} from '../models/job_model.js'

export const applyJob = async(req,res)=>{
     try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job id is required",
                success:false
            })
        }

        // check if the user has already applying for the job
        const existingApplication = await Application.findOne({job: jobId, applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success: false
            })
        }

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job : jobId,
            applicant : userId,
        })

        job.application.push(newApplication._id);
        await job.save(); 
        return res.status(200).json({
            message:"Successfully applied for the job",
            success: true
        })
        
     }catch(error){
        console.log(error);
     }
}

export const get = async(req,res) =>{
    try{
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });

       if(!application){
            return res.status(404).json({
                message:"No application",
                success: false
            })
       }
    
       return res.status(200).json({
          application,
          success:true,
       })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Something wrong in application repostiry",
            success: false,
        })
    }
}

// this is for admin to visit how many applied for this job
export const getApplicant = async(req,res)=>{
    try{
       const jobId = req.params.id;
       console.log(jobId);
       const job = await Job.findById(jobId).populate({
        path:'application',
        option:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
       })
       if(!job){
          return res.status(404).json({
             message:'Job not found',
             success: false
          })
       }

       return res.status(200).json({
          job,
          success: false
       })
    }catch(error){
        console.log(error);
    }
}

export const updateStatus = async(req,res) =>{
     try{
       const {status} = req.body;
       const applicationId = req.params.id;
       if(!status){
         return res.status(400).json({
             message:'status is required',
             success: false
         })
       }

       // find the appkciaton by applicantion id
       const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false
            })
        }

        //now update the status
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });


     } catch(error){
        console.log(error);
     }
}