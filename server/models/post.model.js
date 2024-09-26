import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    // User who posted
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Post content
    content: {
        type: String,
        required: true
    },

    // Post media (image or video)
    media: {
        type: String, // URL of the media
        required: true
    },

    // Post type (image or video)
    type: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    // Post likes
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // Post comments
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],

}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);