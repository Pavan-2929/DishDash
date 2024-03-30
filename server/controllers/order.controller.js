import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const userId = req.id;

    const { cart, paymentMethod } = req.body;

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

    const orderData = await Order.find({
      "orderItems.restaurantId": restaurantId,
    });

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.log(error);
  }
};
