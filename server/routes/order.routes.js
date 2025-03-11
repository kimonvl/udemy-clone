import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createOrder, finalizeOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router()

orderRouter.route("/create-order").post(isAuthenticated, createOrder);
orderRouter.route("/finalize-order").post(isAuthenticated, finalizeOrder);

export default orderRouter