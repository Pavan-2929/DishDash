import express from 'express';
import { createOrder } from '../controllers/order.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post("/create",verifyToken, createOrder);

export default router;