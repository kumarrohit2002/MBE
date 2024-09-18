const bcrypt = require('bcrypt');
const TempUser = require('../models/TempUser.model'); // Temporary user model
const User = require('../models/User.model'); // Main user model
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('./emailService');

// Login function
exports.login = async ({ email, password }) => {
    if(!email || !password) {
        throw new Error('All field is required');
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

    return { user, token };
};

// Forget password
exports.forgotPassword = async ({ email }) => {
    if(!email) {
        throw new Error('email is Required');
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    // Generate a 4-digit OTP
    const otp = crypto.randomInt(1000, 9999).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const subject = 'Password Reset OTP';
    const text = `Your OTP for password reset is: ${otp}`;
    const html = `<p>Your OTP for password reset is:</p><h3>${otp}</h3>`;

    await sendEmail(user.email, subject, text, html);

    return user;
};

// Rest Password
exports.resetPassword = async ({ email, newPassword }) => {
    if(!email || !newPassword) {
        throw new Error('All field are Required!!');
    }
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('User not found');
    }
    
    const hashPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashPassword;
    await user.save();
    
    return user;
};

// Verify Password Otp
exports.verifyPasswordOTP = async ({ email, otp }) => {
    if(!email || !otp){
        throw new Error('All field are Required');
    }
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User not found');
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
        throw new Error('Invalid or expired OTP');
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return user;
};