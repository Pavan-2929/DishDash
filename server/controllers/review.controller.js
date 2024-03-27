import Restaurant from "../models/restaurant.model.js";
import Review from "../models/review.model.js";

export const createReview = async (req, res, next) => {
  try {
    const { restaurantId, rating, comment } = req.body;

    const userId = req.id;

    const newReview = await Review.create({
      restaurantId,
      rating,
      comment,
      userId,
    });

    res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReviewByRestaurantId = async (req, res, next) => {
  try {
    const restaurantId = req.params.id;

    const reviews = await Review.find({ restaurantId });
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
  }
};
