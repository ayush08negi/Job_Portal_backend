import mongoose, { trusted } from 'mongoose'

const companySchema = new mongoose.Schema({
    name:{
        type:'String',
        required:true,
        unique: true
    },
    description:{
        type:'String',
    },
    website:{
        type:'String',
    },
    location:{
        type:'String',
    },
    logo:{
        type:'String',
    },
    userId:{
        type:'String',
        required:true,
        ref:'User'
    }

},{timestamps:true})

export const Company = mongoose.model('Company',companySchema)