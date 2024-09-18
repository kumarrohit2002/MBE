const express=require('express');
const router=express.Router();
const {updateProfilePic} =require('../controllers/profilePicController');
const {middleware} = require('../middleware/middleware');


const authRoutes=require("../routes/authRoutes");
router.use('/user',authRoutes);

const mentorRoutes=require("../routes/mentorRoutes");
router.use('/mentor',mentorRoutes);

const user=require("../routes/userRoutes");
router.use('/user',user);

const appointmentRoutes=require("../routes/appointmentRoutes");
router.use('/appointment',appointmentRoutes)

const paymentRoutes=require('../routes/paymentRoutes');
router.use('/payment',paymentRoutes);

router.post('/upload-profile-pic',middleware,updateProfilePic);

module.exports = router;