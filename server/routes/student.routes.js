import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAllCourses, getFeaturedCourses } from "../controllers/student.controller.js";

const studentRouter = express.Router()

studentRouter.route("/get-featured-courses").post(isAuthenticated, getFeaturedCourses);
studentRouter.route("/get-all-courses").post(isAuthenticated, getAllCourses);


export default studentRouter