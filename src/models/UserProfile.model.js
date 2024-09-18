const mongoose = require('mongoose');

const UserProfileSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{
        type: String,
        
    },
    email:{
        type:String, 
    },
    phoneNo:{
        type: String,
    },
    address:{
        type:String,
    },
    aboutSection:{
        type:String,

    },
    profilePic:{
        type:String,

    },
});

const UserProfile=mongoose.model('UserProfile',UserProfileSchema);
module.exports=UserProfile;