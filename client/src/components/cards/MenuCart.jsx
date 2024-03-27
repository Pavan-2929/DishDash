import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cart/cartSlice";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa"; // Importing React Icons

const MenuCart = ({ menuItem, index }) => {
  const [nextId, setNextId] = useState(1);

  const cartData = {
    _id: nextId,
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
    setNextId(nextId + 1);
  };

  return (
    <div
      key={index}
      className="menu-card border border-gray-400 rounded-md bg-gray-100 overflow-hidden shadow-sm p-2 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <div className="flex pl-3 justify-center">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="w-32 h-32 object-cover"
        />
      </div>
      <div className="p-3 text-center">
        <p className="text-base font-semibold">Name: {menuItem.name}</p>
        <p className="text-gray-600 text-sm mb-1">
          Description: {menuItem.description}
        </p>
        <p className="text-green-600 font-semibold text-sm">
          Price: ${menuItem.price}
        </p>

        <button
          className="flex items-center mx-auto bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-4 text-sm transition-all duration-300 ease-in-out"
          onClick={handleCart}
        >
          <FaCartPlus className="mr-1" /> Add To Cart ({menuItem.price})
        </button>
      </div>
    </div>
  );
};

export default MenuCart;
