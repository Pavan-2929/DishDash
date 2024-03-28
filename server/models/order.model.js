import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: {
        type: [],
        required: true,
    },
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema)

export default Order