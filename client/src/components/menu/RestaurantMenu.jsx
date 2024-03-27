import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import { useParams } from "react-router-dom";
import MenuCard from "../cards/MenuCard";
import MenuCart from "../cards/MenuCart";
import Review from "../review/Review";

const RestaurantMenu = () => {
  const params = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantOwner, setRestaurantOwner] = useState(null);

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/get/${params.id}`
      );

      setRestaurant(response.data);

      const response2 = await axios.get(
        `http://localhost:3000/api/user/get/${response.data?.userId}`
      );
      setRestaurantOwner(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <div className="px-4 md:px-14">
      {restaurant && restaurantOwner && (
        <div>
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-between border-b-2 border-gray-500 pb-14">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <img
                src={restaurant.imageUrl}
                alt=""
                className="w-[80%] rounded-md shadow-md"
              />
            </div>
            <div className="md:w-1/2 md:pl-4">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">
                  Restaurant Details
                </h2>
                <p className="text-gray-600">
                  We provide these cuisines: {restaurant.cuisines.join(", ")}
                </p>
              </div>
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
              <div>
                <h2 className="text-2xl font-semibold mb-2 mt-6">Contact Us</h2>
                <p className="text-gray-600 mb-1">
                  For any inquiries or feedback, feel free to reach out to us
                  at:
                </p>
                <p className="text-gray-600 mb-1">
                  Username: {restaurantOwner.username}
                </p>
                <p className="text-gray-600 mb-1">
                  Email: {restaurantOwner.email}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-b-2 border-gray-500 pb-14">
            <h2 className="text-2xl font-semibold mb-4">Explore our Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {restaurant.menuItems.map((menuItem, index) => (
                <MenuCart key={index} menuItem={menuItem} />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Review/>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;
