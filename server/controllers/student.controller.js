import { Course } from "../models/Course.model.js";
import { StudentCourses } from "../models/StudentCourses.js";

export const getFeaturedCourses = async (req, res) => {
    try {
        const featuredCourses = await Course.aggregate([
            { $addFields: { studentCount: { $size: "$students" } } }, // 🔥 Count students in each course
            { $sort: { studentCount: -1 } }, // 🔥 Sort by student count (descending)
            { $limit: 4 }, // 🔥 Get only the top 4 courses
            {
                $lookup: {
                    from: "users",
                    localField: "instructor",
                    foreignField: "_id",
                    as: "instructorDetails"
                }
            }, // (Optional) Populate instructor details
        ])

        if (!featuredCourses) {
            return res.status(401).json({
                message: "Could not fetch featured courses",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Fetched featured courses successfully",
            success: true,
            featuredCourses,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while fetching featured courses",
            success: false,
        });
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const { filters } = req.body
        let filter = {}
        const studentId = req.id
        if (filters["category"]?.length > 0) {
            filter.category = { $in: filters["category"] }
        }
        if (filters["level"]?.length > 0) {
            filter.level = { $in: filters["level"] }
        }
        if (filters["primaryLanguage"]?.length > 0) {
            filter.primaryLanguage = { $in: filters["primaryLanguage"] }
        }
        const studentCourses = await StudentCourses.findOne({student: studentId})
        let allCourses = await Course.find(filter).populate("instructor", "username")
        //const result = allCourses.filter((course) => !studentCourses.courses.find((stCourse) => {return stCourse.course.toString() === course._id.toString()}))
        const result = allCourses.map((course) => {
            if(studentCourses && studentCourses.courses.find((stCourse) => {return stCourse.course.toString() === course._id.toString()})){
                return {
                    ...course._doc,
                    owned: true
                }
            }else{
                return {
                    ...course._doc,
                    owned: false
                }
            }
        })
       
        return res.status(200).json({
            message: "Fetched all filtered courses successfully",
            success: true,
            allCourses: result,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while fetching featured courses",
            success: false,
        });
    }
}

export const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id

        const course = await Course.findById(courseId)
            .populate({ path: 'instructor', select: 'username' }) // Populate instructor's username
            .populate('lectures') // Populate lectures array

        if (!course) {
            return res.status(401).json({
                message: "Could not fing course",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            success: true,
            course,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while fetching  course details",
            success: false,
        });
    }
}

export const getCourseProgress = async (req, res) => {
    try {
        const courseId = req.params.id
        const studentId = req.id

        const course = await Course.findById(courseId)
            .populate({ path: 'instructor', select: 'username' }) // Populate instructor's username
            .populate('lectures') // Populate lectures array

        if (!course) {
            return res.status(401).json({
                message: "Could not fing course",
                success: false,
            });
        }

        const stdCourses = await StudentCourses.findOne({student: studentId})
        const progressIndex = stdCourses.courses.find((course) => course.course.toString() === courseId).progressIndex
        console.log("progressIndex", progressIndex)
        const result = {
            ...course._doc,
            progressIndex
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            success: true,
            course: result,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while fetching  course details",
            success: false,
        });
    }
}
