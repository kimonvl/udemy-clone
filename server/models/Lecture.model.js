import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true},
    lectureIndex: { type: Number, required: true},
    freePreview: {type: Boolean},
    video: { type: String, required: true, unique: true },
    videoPublicId: { type: String, required: true, unique: true },
    
}, { timestamps: true });
export const Lecture = mongoose.model('Lecture', lectureSchema);