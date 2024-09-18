const mongoose=require('mongoose');

const JobSchema=new mongoose.Schema({
    mentor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    company:{
        type:String,
    },
    jobtitle:{
        type:String,
    },
    jobrole:{
        type:String,
    },
    location:{
        type:String,
    },
    Skillrequirements:[{
        type:String,
    },],
    typeOfWork:{
        type:String,
        enum:['Work from Home','In-Office'],
        default:'In-Office'
    },
    salarymin:{
        type:Number,
    },
    salarymax:{
        type:Number,
    },
    experienceMin:{
        type:Number,
    },
    experienceMax:{
        type:Number,
    },
    lastdateToApply:{
        type:Date,
    },
})

const Job=mongoose.model('Job',JobSchema);
module.exports=Job;