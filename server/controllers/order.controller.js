import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.id;

    const { cart, paymentMethod } = req.body;
    console.log(cart);
    const newOrder = await Order.create({
      userId,
      orderItems: cart,
      paymentMethod,
    });

    res.status(200).json(newOrder);
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersbyUserId = async (req, res, next) => {
  try {
    const userId = req.id;

    const orderData = await Order.find({ userId });

    res.status(200).send(orderData);
  } catch (error) {
    console.log(error);
  }
};

export const getOrdersbyRestaurantId = async (req, res, next) => {
  try {
    const restaurantId = req.params.id;

    const orderData = await Order.find({ restaurantId });

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
}