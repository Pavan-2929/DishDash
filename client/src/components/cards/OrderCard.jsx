import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderCard = ({ orderItem }) => {
  const [restaurantData, setRestaurantData] = useState(null);

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/restaurant/get/${orderItem.restaurantId}`
      );
      setRestaurantData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <div className="flex items-center mb-4 flex-wrap">
        <img
          src={orderItem.imageUrl}
          alt=""
          className="w-16 h-16 mr-4 rounded-md object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{orderItem.name}</h3>
          <p className="text-gray-600">${orderItem.price}</p>
          <p className="text-gray-600">Quantity: {orderItem.quantity}</p>
        </div>
      </div>
      {restaurantData && (
        <div className="text-sm text-gray-600 flex justify-between items-center">
          <div>
            <p>{restaurantData.restaurantName}</p>
            <p>
              {restaurantData.city}, {restaurantData.state}
            </p>
          </div>
          <div>
            <a
              href={`/restaurant/${restaurantData._id}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              Visit Restaurant
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
