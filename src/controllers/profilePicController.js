
const MentorProfile = require('../models/MentorProfile.model');
const UserProfile = require('../models/UserProfile.model');
const imageUpload = require('../utils/imageUpload');
const User=require('../models/User.model');


// Update profilePic based on user role
exports.updateProfilePic = async (req, res) => {
    try {
        const user = req.user;
        let updatedProfile;

        // Check user role and update or create the corresponding profile
        if (user.role === 'MENTOR') {
            let mentorProfile = await MentorProfile.findById(user.mentorProfile);
            if (!mentorProfile) {
                mentorProfile = new MentorProfile({
                    user: user._id,
                    profilePic: null, // Initialize with null
                });
                await mentorProfile.save();

                user.mentorProfile = mentorProfile._id;
                await user.save();
            }

            // Handle image upload with existing image URL (if available)
            const profilePic = await imageUpload.imageUpload(req, mentorProfile.profilePic);
            mentorProfile.profilePic = profilePic;
            updatedProfile = await mentorProfile.save();

        } else if (user.role === 'USER') {
            let userProfile = await UserProfile.findById(user.userProfile);
            if (!userProfile) {
                userProfile = new UserProfile({
                    user: user._id,
                    profilePic: null, // Initialize with null
                });
                await userProfile.save();

                user.userProfile = userProfile._id;
                await user.save();
            }

            // Handle image upload with existing image URL (if available)
            const profilePic = await imageUpload.imageUpload(req, userProfile.profilePic);
            userProfile.profilePic = profilePic;
            updatedProfile = await userProfile.save();
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid user role",
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile picture updated successfully',
            profile: updatedProfile,
        });
    } catch (error) {
        console.error("Error in updateProfilePic:", error.message);
        res.status(500).json({
            success: false,
            message: `${error.message}`,
        });
    }
};
