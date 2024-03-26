import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import { useSelector } from "react-redux";

const MenuCart = ({ menuItem, index }) => {
  const [nextId, setNextId] = useState(1); // State to keep track of next ID

  const cartData = {
    _id: nextId, // Assign the next available ID
    imageUrl: menuItem.imageUrl,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    quantity: 1,
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const handleCart = () => {
    dispatch(addToCart(cartData));
    setNextId(nextId + 1); // Increment the ID for the next item
  };

  return (
    <div
      key={index}
      className="border border-gray-400 rounded-md bg-gray-300 overflow-hidden shadow-sm p-2"
    >
      <div className="flex pl-3">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="w-32 h-32 object-cover"
        />
      </div>
      <div className="p-3">
        <p className="text-base font-semibold">name: {menuItem.name}</p>
        <p className="text-gray-600 text-sm mb-1">
          desciption: {menuItem.description}
        </p>
        <p className="text-green-600 font-semibold text-sm">
          price: ${menuItem.price}
        </p>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-4 text-sm"
          onClick={handleCart}
        >
          Add To cart
        </button>
      </div>
    </div>
  );
};

export default MenuCart;
