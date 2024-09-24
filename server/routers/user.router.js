import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import authenticateToken from '../middlewares/user.auth.middleware.js';
import { uploadOnCloudinay } from '../utils/Cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = express.Router();


router.post('/userRegister', async (req, res) => {
    const { fullname, username, email, password } = req.body;
    if (!username || !email || !password || !fullname) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await User.create({ username, fullname, email, password: hashedPassword });
        res.status(201).json({ message: "User created successfully", res: response });
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
    try {
        const image = await uploadOnCloudinay(req.files.profilePicture[0].path);
        const user = await User.findByIdAndUpdate(req.user, { username, profilePicture: image.url, fullname, bio }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json({ message: "profile updated successfully", res: user });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(400).json(err);
    }
})

export default router;