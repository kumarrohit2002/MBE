const mongoose=require('mongoose');

const ReviewRatingSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    Comment:{
        type:String,
        required:true
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'MentorProfile'
    }
})