import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['student', 'instructor'], // Only allows these two values
        default: 'student', // Default role is student
        required: true
    },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);