import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "../components/cards/OrderCard";
import moment from "moment";
import { FaMoneyBillAlt, FaCreditCard } from "react-icons/fa";
import OrderLoader from "../components/loader/OrderLoader";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        "http://localhost:3000/api/order/get/userId",
        { withCredentials: true }
      );
      setOrders(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-10 max-w-6xl">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Orders</h1>
      <div>
        {orders && orders.length === 0 && isLoading ? (
          <div>
            <p className="text-center foent-bold text-3xl text-red-500">
              No order currently
            </p>
            <div className="flex flex-col gap-6">

            <OrderLoader/>
            <OrderLoader/>
            </div>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div key={order._id} className="mb-8">
                <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 border border-gray-500">
                  <div className="flex justify-between flex-wrap">
                    <h2 className="text-lg font-semibold mb-2">
                      Order ID: {order._id}
                    </h2>
                    <p>Order-Status: {order.orderStatus}</p>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {order.orderItems.map((orderItem, index) => (
                      <OrderCard key={index} orderItem={orderItem} />
                    ))}
                  </div>
                  <div className="flex  gap-8">
                    <div className="text-sm text-gray-600 mt-2">
                      <p>
                        Order booked at:{" "}
                        {moment(order.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                    </div>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
