// CartIcon.js
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Cart from "./Cart";

const CartIcon = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-300 shadow-md hover:cursor-pointer">
        <FaShoppingCart
          className="text-gray-700 text-2xl"
          onClick={toggleModal}
        />
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg w-[95vw] md:w-[40vw] max-h-[80vh] overflow-y-auto">
            <Cart />
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-lg transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
