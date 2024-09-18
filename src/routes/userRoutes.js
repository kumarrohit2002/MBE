const express = require('express');

const {createUserProfile,getUserProfileData,updateUserProfile}=require('../controllers/userController');
const {middleware} = require('../middleware/middleware');

const router = express.Router();


router.post('/create-user-profile', middleware,createUserProfile);
router.post('/getuser-profile', middleware,getUserProfileData);

module.exports = router;
