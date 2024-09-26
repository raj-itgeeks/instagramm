import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import authenticateToken from '../middlewares/user.auth.middleware.js';
import { uploadOnCloudinay } from '../utils/Cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
import { ApiError } from '../utils/ApiError.js';
const router = express.Router();


router.post('/userRegister', async (req, res) => {
    const { fullname, username, email, password } = req.body;
    if (!username || !email || !password || !fullname) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        return ApiError(res, 409, "User with email or username already exists")
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({ username, fullname, email, password: hashedPassword });
        const createdUser = await User.findById(response._id).select(
            "-password  -refreshToken"
        )
        if (!createdUser) {
            return ApiError(res, 500, "Something went wrong while registering the user")
        }
        res.status(201).json({ message: "User registered successfully", res: createdUser });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).json(err);
    }
})
router.post('/userLogin', async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        const userLogged = await User.findOne(user._id).select('-password');
        const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
        res.status(201).json({ message: "Login succesfull", res: userLogged, accessToken: token });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).json(err);
    }
})

router.post('/profileUpdate', authenticateToken, upload.fields([{ name: 'profilePicture', maxCount: 1 }]), async (req, res) => {
    const { username, fullname, bio } = req.body;
    const updateData = { username, fullname, bio };

    try {
        // Check if a profile picture is provided
        if (req.files.profilePicture && req.files.profilePicture.length > 0) {
            const image = await uploadOnCloudinay(req.files.profilePicture[0].path);
            updateData.profilePicture = image.url; // Add profile picture to update data
        }

        const user = await User.findByIdAndUpdate(req.user, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: "Profile updated successfully", res: user });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).json({ message: 'Error updating profile', error: err });
    }
});

// handling search
router.get('/search/:usernametosearch', authenticateToken, async (req, res) => {
    const { usernametosearch } = req.params;
    const users = await User.find({ $or: [{ username: { $regex: usernametosearch, $options: 'i' } }, { fullname: { $regex: usernametosearch, $options: 'i' } }] }).select('-password');
    res.status(200).json(users);
})



export default router;