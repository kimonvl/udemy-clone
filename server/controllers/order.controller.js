import dotenv from "dotenv";
import { Course } from "../models/Course.model.js";
import paypal from "../utils/paypal.js";
import { Order } from "../models/Order.js";
dotenv.config({});

const createOrder = async (req, res) => {
    try {
        const userId = req.id
        const {courseId, orderStatus, paymentMethod, paymentStatus, orderDate, paymentId, payerId} = req.body

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(401).json({
                message: "Course not found",
                success: false,
            }); 
        }

        const create_payment_json = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls:{
                return_url: `${process.env.CLIENT_URL}/payment-return`,
                cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
            },
            transaction: [
                {
                    item_list: {
                        items: [
                            {
                                name: course.title,
                                sku: course._id,
                                price: course.pricing,
                                currency: "USD",
                                quantity: 1,
                            }
                        ]
                    },
                    amount: {
                        currency: "USD",
                        total: course.pricing.toFixed(2),
                    },
                    description: course.title,
                }
            ]
        }

        // @ts-ignore
        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if(error){
                console.log(error)
                return res.status(401).json({
                    message: "Error while creating payment",
                    success: false,
                });
            }else{
                const newOrder = new Order({
                    student: userId,
                    course: course._id,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    orderDate,
                    paymentId,
                    payerId,
                })

                await newOrder.save()

                const approveUrl = paymentInfo.links?.find((link) => link.rel == "approval_url")?.href
                return res.status(200).json({
                    message: "Order created successfully",
                    success: true,
                    approveUrl,
                    orderId: newOrder._id,
                });
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Error while creating order",
            success: false,
        });
    }
}