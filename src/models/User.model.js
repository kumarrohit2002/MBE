const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['MENTOR', 'USER'], default: 'USER' },
    otp: { type: String },
    otpExpires: { type: Date },
    mentorProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MentorProfile',
        function() { return this.role === 'MENTOR'; }
    },
    userProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile',
        function() { return this.role === 'USER'; }
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
