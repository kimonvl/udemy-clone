import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const authRouter = express.Router();

authRouter.route("/register").post(register);
authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
// @ts-ignore
authRouter.route("/checkauthenticated").post(isAuthenticated, (req, res) => {
    return res.status(201).json({
        message: "User is authenticated",
        success: true,
    });
});

export default authRouter;
