import mongoose from 'mongoose'

// this for applicant who has applied for the job
const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:trusted,
    },
    applicant:{
        type: String,
        ref:'User',
        required:true,
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default: 'pending'
    }

},{timestamps:true})

export const Application = mongoose.model(Application,applicationSchema);