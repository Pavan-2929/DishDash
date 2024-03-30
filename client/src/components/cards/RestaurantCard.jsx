import React, { useEffect, useState } from "react";
import { FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const RestaurantCard = ({ restaurant, path, fetchRestaurants }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (e) => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/review/get/restaurant/${restaurant._id}`
      );

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const countAverageReviews = () => {
    if (reviews.length === 0) return 0;

    let total = 0;
    reviews.map((review) => {
      total += review.rating;
    });

    return total / reviews.length;
  };



  return (
    <div
      key={restaurant._id}
      className="bg-gray-200 rounded-lg shadow-md overflow-hidden max-w-[300px]"
    >
      <img
        src={restaurant.imageUrl}
        alt=""
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <p className="text-xl font-semibold mb-2">
          {restaurant.restaurantName}
        </p>
        <div className="flex items-center mb-2 text-gray-600">
          <FiMapPin className="mr-1" />
          <p>
            {restaurant.city}, {restaurant.state}
          </p>
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <FiDollarSign className="mr-1" />
          <p>Delivery Price: ${restaurant.deliveryPrice}</p>
        </div>
        <div className="flex items-center mb-2 text-gray-600">
          <FiClock className="mr-1" />
          <p>Delivery Time: {restaurant.estimatedDeliveryTime} minutes</p>
        </div>
        <div className="flex items-center text-gray-600">
          <p>Average Rating: {countAverageReviews().toFixed(1)} / 5 ★</p>
        </div>
        <div className="mt-6 flex gap-4">
          <Link
            to={`/restaurant/${path}`}
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
