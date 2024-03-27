import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createReview } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);

export default router;
