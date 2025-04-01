import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllCourses, getCourseDetails, getFeaturedCourses, getCourseProgress } from "../controllers/student.controller.js";

const studentRouter = express.Router()

studentRouter.route("/get-featured-courses").post(isAuthenticated, getFeaturedCourses);
studentRouter.route("/get-all-courses").post(isAuthenticated, getAllCourses);
studentRouter.route("/get-course-details/:id").post(isAuthenticated, getCourseDetails);
studentRouter.route("/get-course-progress/:id").post(isAuthenticated, getCourseProgress);

export default studentRouter