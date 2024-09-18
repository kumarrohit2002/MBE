const express = require('express');
const router = express.Router();

const {createMetorProfile}=require('../controllers/mentorController');

const {payment_checkout,payment_verification} =require('../controllers/PaymentController');

router.post('/payment-checkout',payment_checkout);
router.post('/payment-verification',payment_verification);


module.exports = router;
