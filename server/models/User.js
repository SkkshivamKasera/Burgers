import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    google_id: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("users", userSchema)