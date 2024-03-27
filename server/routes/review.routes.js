import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { createReview, getReviewByRestaurantId } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/get/restaurant/:id", getReviewByRestaurantId)

export default router;
