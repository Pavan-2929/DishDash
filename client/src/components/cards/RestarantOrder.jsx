import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaUser,
  FaStore,
  FaMapMarkerAlt,
  FaPhone,
  FaMoneyBillAlt,
  FaCreditCard,
} from "react-icons/fa";
import moment from "moment";

const RestaurantOrders = ({ order }) => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/user/get/${order.userId}`
      );
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/restaurant/get/${params.id}`
      );
      setRestaurant(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
    fetchUserData();
  }, []);

  const updateOrderStatus = async (e) => {
    const newOrderStatus = e.target.value;
    setOrderStatus(newOrderStatus);

    try {
      const response = await axios.put(
        `https://dishdash-server.onrender.com/api/order/update/orderstatus/${order._id}`,
        { orderStatus: newOrderStatus }
      );

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="p-4 border rounded-md shadow-md mb-8 bg-gray-200 mt-8 border-gray-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <div className="flex flex-col gap-2">
          <span className="text-gray-600 text-sm">
            {" "}
            {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
      </div>
      <div className="mb-4 flex gap-6 border-b-2 pb-2 border-gray-500 flex-wrap">
        {order.orderItems.map((orderItem, index) => (
          <div key={index} className="flex items-center space-x-4 mb-2">
            <img
              src={orderItem.imageUrl}
              alt=""
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <p className="font-semibold text-gray-800">{orderItem.name}</p>
              <p className="text-gray-600">${orderItem.price}</p>
              <p className="text-gray-600">Quantity: {orderItem.quantity}</p>
              <div className="flex items-center mt-2 text-gray-800">
                {order.paymentMethod === "cash" ? (
                  <div className="flex items-center mr-4">
                    <FaMoneyBillAlt className="mr-2" />
                    <span>Cash</span>
                  </div>
                ) : (
                  <div className="flex items-center mr-4">
                    <FaCreditCard className="mr-2" />
                    <span>Online</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center flex-wrap">
        <div>
          {user && (
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                <FaUser className="mr-2" /> User Details
              </h3>
              <div className="flex items-center space-x-4">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="w-20 h-20 object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user.username}</p>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-gray-600 flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    {user.address.street}, {user.address.city},{" "}
                    {user.address.state}, {user.address.zipcode}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <FaPhone className="mr-1" />
                    {user.phoneNo}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {restaurant && (
            <div>
              <div className="text-gary-600 flex items-center mt-4 md:mb-6">
                <FaStore className="mr-2" />
                Restaurant Name: {restaurant.restaurantName}
              </div>
              <div>
                Order-Status:
                <select
                  value={orderStatus}
                  disabled={orderStatus === "delivered"}
                  onChange={updateOrderStatus}
                  className="w-full p-2 bg-gray-200 text-black focus:bg-none rounded-md border-2 border-gray-500"
                >
                  <option
                    value="pending"
                    disabled={
                      orderStatus === "processing" ||
                      orderStatus === "delivered"
                    }
                  >
                    Pending
                  </option>
                  <option
                    value="processing"
                    disabled={orderStatus === "delivered"}
                  >
                    processing
                  </option>
                  <option value="delivered">delivered</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantOrders;
