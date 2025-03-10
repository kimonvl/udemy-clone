import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import authRouter from "./routes/auth.routes.js";
import instructorRouter from "./routes/instructor.routes.js";
import studentRouter from "./routes/student.routes.js";

dotenv.config({});
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use("/auth", authRouter);
  app.use("/instructor", instructorRouter);
  app.use("/student", studentRouter);

  app.listen(PORT, () => {
    connectDB();
    console.log(`Server is now running on port ${PORT}`);
  });