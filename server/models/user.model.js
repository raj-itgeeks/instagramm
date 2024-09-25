// creating user model
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    website: { type: String },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);


