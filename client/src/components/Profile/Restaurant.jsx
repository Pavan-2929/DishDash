import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import SkeletonLoader from "../loader/Card";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/restaurant/get",
        { withCredentials: true }
      );

      console.log(response.data);
      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      <div className="text-2xl mb-6 text-center">
        <p>Your restaurants</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {restaurants &&
          restaurants.map((restaurant) => (
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
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-1" />
                  <p>
                    Delivery Time: {restaurant.estimatedDeliveryTime} minutes
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to={`/restaurant/${restaurant._id}`}
                    className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
                  >
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <Link to='/restaurant/create'>
          <SkeletonLoader/>
          </Link>
      </div>
    </div>
  );
};

export default Restaurant;
