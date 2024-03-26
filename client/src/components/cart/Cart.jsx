import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className="flex items-center border-b pb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 mr-4 rounded-md object-cover"
              />
              <div className="flex flex-col flex-grow">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-4 text-sm"
                  onClick={() => handleRemoveFromCart(item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
