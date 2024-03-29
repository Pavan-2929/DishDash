import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  createRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getRestaurantsbyRestaurantID,
  getRestaurantsbyUserID,
  updateRestaurant,
} from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/create", createRestaurant);
router.get("/owner/get", verifyToken, getRestaurantsbyUserID);
router.get("/get/:id", getRestaurantsbyRestaurantID);
router.put("/update/:id", updateRestaurant);
router.get("/datas", getAllRestaurants);
router.delete("/delete/:id", deleteRestaurant)

export default router;
