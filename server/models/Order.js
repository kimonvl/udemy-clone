import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    orderDate: Date,
    paymentId: String,
    payerId: String,
}, { timestamps: true });
export const Order = mongoose.model('Order', orderSchema);