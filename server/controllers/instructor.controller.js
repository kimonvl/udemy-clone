import { Course } from "../models/Course.model.js";
import { Lecture } from "../models/Lecture.model.js";
import { deleteMediaFromCloudinary, uploadMediaToCloudinary } from "../utils/cloudinary.js";

export const uploadMedia = async (req, res) => {
    try {
        console.log(req.file);
        const media = req.file;
        if (!media) {
            return res.status(401).json({
                message: "Provide media to upload",
                success: false,
            });
        }

        const result = await uploadMediaToCloudinary(media.path);
        if (!result) {
            return res.status(401).json({
                message: "Failed to upload media",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Media uploaded",
            success: true,
            secure_url: result.secure_url,
            public_id: result.public_id,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while uploading media",
            success: false,
        });
    }
}
export const deleteMedia = async (req, res) => {
    try {
        const {mediaPublicId, resourceType} = req.body;
        console.log("delete media ", mediaPublicId)

        if (!mediaPublicId) {
            return res.status(401).json({
                message: "Provide id of media",
                success: false,
            });
        }

        const result = await deleteMediaFromCloudinary(mediaPublicId, resourceType);
        console.log("delete media ", result)
        if (!result) {
            return res.status(401).json({
                message: "Failed to delete media",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Media deleted",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while deleting media",
            success: false,
        });
    }
}

export const masDeleteVideos = async (req, res) => {
    try {
        let {videos} = req.body;
        videos = JSON.parse(videos)

        if (videos.length <= 0) {
            return res.status(401).json({
                message: "Provide id of videos",
                success: false,
            });
        }

        for(const video of videos){
            const result = await deleteMediaFromCloudinary(video, "video");
            console.log("delete video ", result)
            if (!result) {
                return res.status(401).json({
                    message: "Failed to delete video",
                    success: false,
                });
            }
        }
        return res.status(200).json({
            message: "Videos deleted",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while deleting videos",
            success: false,
        });
    }


}

export const createNewCourse = async (req, res) => {
    try {
        const instructor = req.id;
        const { title, category, level, primaryLanguage, subtitle, description, pricing, objectives, welcomeMessage, image, imagePublicId, lectures } = req.body;
        
        const course = await Course.create({
            instructor,
            title,
            category,
            level,
            primaryLanguage,
            subtitle,
            description,
            pricing,
            objectives,
            welcomeMessage,
            image,
            imagePublicId,
        });
        if (!course) {
            return res.status(401).json({
                message: "Error while creating course",
                success: false,
            });
        }

        return await addLecturesTocourse(lectures, course, res);

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while creating course",
            success: false,
        });
    }
}

const addLecturesTocourse = async (lectures, course, res) => {
    try {
        lectures = JSON.parse(lectures);
        let lecIds = [];
        if (lectures) {
            for (const lecture of lectures) {
                const newLecture = await Lecture.create({
                    title: lecture.title,
                    lectureIndex: lecture.lectureIndex,
                    freePreview: lecture.freePreview,
                    video: lecture.video,
                    videoPublicId: lecture.videoPublicId,
                });
                if (!newLecture) {
                    return res.status(401).json({
                        message: "Error while creating lecture",
                        success: false,
                    });
                }
                lecIds.push(newLecture._id);
            }
        }
        const updateRes = await Course.findByIdAndUpdate(course._id,
            { $push: { lectures: { $each: lecIds } } },  // Push all lectures to the course
        )
        console.log("updateRes", updateRes);
        if (!updateRes) {
            return res.status(401).json({
                message: "Error while adding lectures to course",
                success: false,
            });
        }
        return res.status(201).json({
            message: "Course created successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while creating lectures",
            success: false,
        });
    }
}

export const editCourse = async (req, res) => {
    try {
        const instructorId = req.id
        const courseId = req.params.id
        const { title, category, level, primaryLanguage, subtitle, description, pricing, objectives, welcomeMessage, image, imagePublicId, lectures } = req.body;

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(401).json({
                message: "Course not found",
                success: false,
            });
        }
        
        if(course.instructor.toString() !== instructorId){
            return res.status(401).json({
                message: "Unauthorized instructor to edit this course",
                success: false,
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                title,
                category,
                level,
                primaryLanguage,
                subtitle,
                description,
                pricing,
                objectives,
                welcomeMessage,
                image,
                imagePublicId,
            },
            { new: true, runValidators: true } // ✅ Return updated document
        );
        if(!updatedCourse){
            return res.status(401).json({
                message: "Failed to update course",
                success: false,
            });
        }

        return await editLecturesOfCourse(res, lectures, courseId)
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while editing course",
            success: false,
        });
    }
}

const editLecturesOfCourse = async (res, lectures, courseId) => {
    try {
        lectures = JSON.parse(lectures);
        let lecIds = [];
        if (lectures) {
            for (const lecture of lectures) {
                if("_id" in lecture){
                    //update existing lectures
                    console.log("updating lecture ", lecture.video);
                    console.log("updating lecture id ", lecture._id);
                    
                    const updatedLecture = await Lecture.findByIdAndUpdate(lecture._id,{
                        title: lecture.title,
                        lectureIndex: lecture.lectureIndex,
                        freePreview: lecture.freePreview,
                        video: lecture.video,
                        videoPublicId: lecture.videoPublicId, 
                    })
                    console.log("updating lecture result ", updatedLecture);
                    if(!updatedLecture){
                        return res.status(401).json({
                            message: "Failed to update lecture",
                            success: false,
                        });
                    }
                }else {
                    //create newlly added lectures
                    const newLecture = await Lecture.create({
                        title: lecture.title,
                        lectureIndex: lecture.lectureIndex,
                        freePreview: lecture.freePreview,
                        video: lecture.video,
                        videoPublicId: lecture.videoPublicId,
                    });
                    if (!newLecture) {
                        return res.status(401).json({
                            message: "Error while creating lecture",
                            success: false,
                        });
                    }
                    lecIds.push(newLecture._id);
                }
            }
        }

        if(lecIds.length > 0){
            const updateRes = await Course.findByIdAndUpdate(courseId,
                { $push: { lectures: { $each: lecIds } } },  // Push all lectures to the course
            )
            if (!updateRes) {
                return res.status(401).json({
                    message: "Error while adding lectures to course",
                    success: false,
                });
            }
        }

        return res.status(201).json({
            message: "Course edited successfully",
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while editing lectures",
            success: false,
        });
    }
}

export const getInstructorCourseList = async (req, res) => {
    try {
        const instructorId = req.id
        const courses = await Course.find({instructor: instructorId}).select("title pricing students")
        return res.status(201).json({
            message: "Course list fetched successfully",
            success: true,
            courses
        });
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error while fetching instructor's course list",
            success: false,
        });
    }
}

export const getInstructorCourseByID = async (req, res) => {
    try {
        const courseId = req.params.id
        const course = await Course.findById(courseId).select(
            "title category description image imagePublicId level objectives pricing primaryLanguage subtitle welcomeMessage lectures"
        ).populate({
            path: "lectures",
            select: "title freePreview lectureIndex video videoPublicId"
        })
        if(!course){
            return res.status(401).json({
                message: "Course not found",
                success: false,
            });
        }
        return res.status(201).json({
            message: "Course fetched successfully",
            success: true,
            course
        });
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Error while fetching course",
            success: false,
        });
    }
}