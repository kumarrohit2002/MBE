const ReviewRating = require("../models/ReviewRating.model");
const MentorProfile = require('../models/MentorProfile.model');

// Create review rating
exports.createReviewRating = async (req, res) => {
    try {
        const userId = req.user._id;
        const { rating, review, mentorProfileId } = req.body;

        // Validate input
        if (!rating || !review || !mentorProfileId) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if the user has already given a review for this mentor
        const existingReview = await ReviewRating.findOne({ userId: userId, mentorId: mentorProfileId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'Review and rating already exist',
            });
        }

        // Create new review rating
        const newReviewRating = await ReviewRating.create({
            userId: userId,
            rating,
            review,
            mentorId: mentorProfileId,
        });

        // Add the new review rating to the mentor's profile
        const updatedMentorProfile = await MentorProfile.findByIdAndUpdate(
            mentorProfileId,
            { $push: { reviewRatings: newReviewRating } },  // Push to array
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Your review and rating have been added',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

