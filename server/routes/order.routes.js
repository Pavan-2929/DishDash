import express from 'express';
import { createOrder, getOrdersbyRestaurantId, getOrdersbyUserId, updateOrderStatus } from '../controllers/order.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken, createOrder);
router.get("/get/userId",verifyToken, getOrdersbyUserId)
router.get("/get/restaurantId/:id", getOrdersbyRestaurantId)
router.put("/update/orderstatus/:id", updateOrderStatus);

export default router;