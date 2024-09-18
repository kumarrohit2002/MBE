const mongoose = require('mongoose');

const MentorProfileSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
    },
    name: {
        type: String,
    },
    title: {
        type: String, 
    },
    dob: {
        type: Date,  // Changed to Date type for proper date handling
    },
    areaOfExpertise: [{
        type: String,
    }],
    yearsOfExperience: {
        type: Number,  // Allows decimal values like 2.5
    },
    address: {
        type: String,
    },
    skills: [{
        type: String,
    }],
    language: [{
        type: String,
    }],
    aboutSection: {
        type: String,
    },
    profilePic: {
        type: String,  // Optional field
        default: null,
    },
    achievements: [{
        type: String,
    }],
    socialMediaLinks: {
        linkedin: { type: String },
        twitter: { type: String },
        github: { type: String },
        email: { type: String },
    },
    perHourcharge: {
        type: Number,
    },
    phone: {
        type: String,  // Add phone number field
    },
    category: {
        type: String,  // Add category field (e.g., 'Technical', 'Business')
    },
    reviewrating: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewRating',  // Reference the ReviewRating model
    }],
    timePreferences: [{
        day: { 
            type: String, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
        },
        times: [{
            time: { type: String, required: true },  // E.g., '10:00'
            ampm: { type: String, enum: ['AM', 'PM'] }  // 'AM' or 'PM'
        }]
    }]
}, { timestamps: true });  // Add timestamps to track creation and update times

const MentorProfile = mongoose.model('MentorProfile', MentorProfileSchema);
module.exports = MentorProfile;
