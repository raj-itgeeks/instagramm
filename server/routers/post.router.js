import authenticateToken from "../middlewares/user.auth.middleware.js";
import express from 'express';
import { Post } from "../models/post.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadOnCloudinay } from "../utils/Cloudinary.js";
const router = express.Router();

router.post('/createPost', authenticateToken, upload.fields([{ name: 'media', maxCount: 1 }]), async (req, res) => {
    const { content, type } = req.body;
    const user = req.user;
    const updateData = { user, content, type }
    try {
        if (req.files.media && req.files.media.length > 0) {
            const image = await uploadOnCloudinay(req.files.media[0].path);
            updateData.media = image.url; // Add profile picture to update data
        }
        const post = new Post({
            ...updateData
        })
        await post.save();
        res.status(201).json({ message: "Post created successfully", res: post });
    } catch (error) {
        console.log(error);
    }
})

router.get('/getUserPosts', authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        const posts = await Post.find({ user });
        res.status(200).json({ posts });
    } catch (err) {
        console.log(err);
    }
})
export default router