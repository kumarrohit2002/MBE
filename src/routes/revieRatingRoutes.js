const express=require('express');
const router=express.Router();

const {createReviewRating}=require('../controllers/ReviewRatingController');
const {middleware}=require('../middleware/middleware');

router.post('create-review-rating',middleware,createReviewRating);

module.exports=router;