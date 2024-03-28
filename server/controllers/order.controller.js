import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.id;

    const cart = req.body;
console.log(cart);
    const newOrder = await Order.create({
      userId,
      orderItems: cart,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
  }
};
