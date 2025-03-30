import mongoose from "mongoose";

const studentCoursesSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
    courses: [
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
            dateOfPurchase: { type: Date, default: Date.now },
            progressIndex: { type: Number, default: 0 },
        }
    ],
}, { timestamps: true });
export const StudentCourses = mongoose.model('StudentCourses', studentCoursesSchema);