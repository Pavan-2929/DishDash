import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiCheckCircle } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAllItems } from "../../redux/cart/cartSlice";

const Success = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(removeAllItems());
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center mb-8 text-3xl">
        <NavLink to="/" className="text-blue-600 hover:underline">
          Back to Home Page
        </NavLink>
      </h1>
      <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg bg-gray-200">
        <div className="flex items-center justify-center text-green-500 mb-4">
          <FiCheckCircle className="text-5xl" />
          <h2 className="text-lg font-semibold ml-2">Payment Successful!</h2>
        </div>
        <div className="bg-gray-100 rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b-2 border-gray-300 pb-2 mb-4"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 mr-4 rounded-md object-cover"
                  />
                  <div className="flex flex-col flex-grow">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
