import authenticateToken from "../middlewares/user.auth.middleware.js";
import express from 'express';
import { Follower } from "../models/follower.model.js"
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const router = express.Router();

router.post('/follow', authenticateToken, async (req, res) => {
    const id = req.user; // jo follow kare ga wo
    const { toFollow } = req.body; // jisko follow kare ga
    const follower = new Follower({ following: id, follower: toFollow });
    await follower.save();
    res.status(201).json({ message: "Followed successfully" });
})

//api to get following list of a user
router.get('/following', authenticateToken, async (req, res) => {
    const userId = req.user; // User who is authenticated
    try {
        const channel = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "followers", // Refers to the Follower collection
                    localField: "_id",
                    foreignField: "following", // Match where the user is following
                    as: "followingTo"
                }
            },
            {
                $lookup: {
                    from: "followers", // Refers to the Follower collection
                    localField: "_id",
                    foreignField: "follower", // Match where the user is being followed
                    as: "followers"
                }
            },
            {
                $addFields: {
                    followersCount: { $size: "$followers" }, // Count of followers
                    followingToCount: { $size: "$followingTo" } // Count of users being followed
                }
            },
            {
                $project: {
                    fullName: 1,
                    username: 1,
                    followersCount: 1,
                    followingToCount: 1,
                    email: 1
                }
            }
        ]);
        console.log(channel);
        if (!channel.length) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: "User followers fetched successfully", res: channel[0] });
    } catch (err) {
        console.error('Error fetching following data:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/followingList', authenticateToken, async (req, res) => {
    try {
        const userId = req.user;
        const followingList = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "followers", // Refers to the Users collection
                    localField: "_id", // Assuming the field name is followingUser
                    foreignField: "following",
                    as: "followingUser"
                }
            },
            {
                $unwind: "$followingUser" // Unwind the followingUser array
            },
            {
                $addFields: {
                    followingList: '$followingUser' // Count of users being followed
                }
            },
            {
                $project: {
                    fullName: 1,
                    username: 1,
                }
            }
        ])

        console.log(followingList);
        return res.status(200).json({ message: "User following list fetched successfully", followingList });
    } catch (err) {
        console.error('Error fetching following data:', err);
    }
})
// unfollow
router.post('/unfollow', async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

    } catch (err) {
        console.error('Error fetching user:', err);
    }

})


export default router