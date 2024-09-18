const express = require('express');
const {
    signup,
    verifyOTP,
    resendOTP,
    login,
    forgotPassword,
    verifyPasswordOTP,
    resetPassword,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);  // New route for resending OTP
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password-otp', verifyPasswordOTP);
router.post('/reset-password', resetPassword);


module.exports = router;
