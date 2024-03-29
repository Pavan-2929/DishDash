import express from 'express';
import { createOrder, getOrdersbyRestaurantId, getOrdersbyUserId } from '../controllers/order.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken, createOrder);
router.get("/get/userId",verifyToken, getOrdersbyUserId)
router.get("/get/restaurantId", getOrdersbyRestaurantId)

export default router;