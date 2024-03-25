import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  desciption: { type: String },
  imageUrl: { type: String },
});

const restaurantSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: [menuItemSchema],
  imageUrl: { type: String, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
