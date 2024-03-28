import express from 'express';
import { createOrder, getOrdersbyUserId } from '../controllers/order.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken, createOrder);
router.get("/get/userId",verifyToken, getOrdersbyUserId)

export default router;