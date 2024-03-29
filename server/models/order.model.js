import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      type: [],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online"],
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
      required: true,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema)

export default Order