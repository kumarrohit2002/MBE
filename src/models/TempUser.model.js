const mongoose = require('mongoose');

const tempUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpires: { type: Date, required: true },
});

const TempUser = mongoose.model('TempUser', tempUserSchema);

module.exports = TempUser;
