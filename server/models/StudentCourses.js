import mongoose from "mongoose";

const studentCursesSchema = new mongoose.Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    courses: [
        {
            course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
            dateOfPurchase: { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true });
export const StudentCourses = mongoose.model('StudentCourses', studentCursesSchema);