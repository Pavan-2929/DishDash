import Restaurant from "../models/restaurant.model.js";

export const createRestaurant = async (req, res, next) => {
  try {
    const restaurantData = req.body;

    const newRestaurant = await Restaurant.create(restaurantData);

    return res.status(200).json(newRestaurant);
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantsbyUserID = async (req, res, next) => {
  try {
    const id = req.id;

    const allRestaurants = await Restaurant.find({ userId: id });

    res.status(200).json(allRestaurants);
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantsbyRestaurantID = async (req, res, next) => {
  try {
    const id = req.params.id;

    const reqrestaurant = await Restaurant.findById(id);


    res.status(200).json(reqrestaurant);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const id = req.params.id;

    const udpatedData = req.body;

    const updatedRestaurantData = await Restaurant.findByIdAndUpdate(
      { _id: id },
      { $set: udpatedData },
      { new: true }
    );

    res.status(200).json(updatedRestaurantData);
  } catch (error) {
    console.log(data);
  }
};

export const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
    console.log(error);
  }
};
