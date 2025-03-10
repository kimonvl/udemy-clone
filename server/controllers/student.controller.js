import { Course } from "../models/Course.model.js";

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

        if(!featuredCourses){
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
        const {filters} = req.body
        let filter = {}
        if(filters["category"]?.length > 0){
            filter.category = { $in: filters["category"] }
        }
        if(filters["level"]?.length > 0){
            filter.level = { $in: filters["level"] }
        }
        if(filters["primaryLanguage"]?.length > 0){
            filter.primaryLanguage = { $in: filters["primaryLanguage"] }
        }
        const allCourses = await Course.find(filter).populate("instructor", "username")
        
        return res.status(200).json({
            message: "Fetched all filtered courses successfully",
            success: true,
            allCourses,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while fetching featured courses",
            success: false,
        });
    }
}