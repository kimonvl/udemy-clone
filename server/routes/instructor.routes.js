import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { upload } from "../utils/multer.js";
import { createNewCourse, deleteMedia, editCourse, getInstructorCourseByID, getInstructorCourseList, masDeleteVideos, uploadMedia } from "../controllers/instructor.controller.js";

const instructorRouter = express.Router();

instructorRouter.route("/create-new-course").post(isAuthenticated, createNewCourse);
instructorRouter.route("/edit-course/:id").post(isAuthenticated, editCourse);
instructorRouter.route("/upload-media").post(isAuthenticated, upload.single("media"), uploadMedia);
instructorRouter.route("/delete-media").post(isAuthenticated, deleteMedia);
instructorRouter.route("/mas-delete-videos").post(isAuthenticated, masDeleteVideos);
instructorRouter.route("/get-instructor-course-list").post(isAuthenticated, getInstructorCourseList);
instructorRouter.route("/get-instructor-course/:id").post(isAuthenticated, getInstructorCourseByID);


export default instructorRouter;