const mongoose=require('mongoose');
const MentorProfile = require('./MentorProfile.model');

const ApplyedJobSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    JobProtal:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true,
    },
    resume:{
        type:String,
        required:true,
    },
    atsScores:{
        type:String,
        required:true,
    }
});

const ApplyedJob=mongoose.model('ApplyedJob',ApplyedJobSchema);
module.exports=ApplyedJob;