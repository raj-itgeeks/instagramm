import mongoose, { Schema } from "mongoose"

const followersSchema = new Schema({
    following: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    follower: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
        ref: "User"
    }
}, { timestamps: true })

export const Follower = mongoose.model("Follower", followersSchema)