import Restaurant from "../models/restaurant.model.js"

export const createRestaurant = async (req, res, next) => {
    try {
        const restaurantData = req.body

        const newRestaurant = await Restaurant.create(restaurantData);

        return res.status(200).json(newRestaurant)
    } catch (error) {
        console.log(error);
    }
}