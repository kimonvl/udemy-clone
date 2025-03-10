import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    primaryLanguage: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    pricing: { type: Number, required: true },
    objectives: { type: String, required: true },
    welcomeMessage: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: { type: String, required: true, unique: true },
    lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture'}],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
export const Course = mongoose.model('Course', courseSchema);