import React from "react";

const MenuCard = ({ menuItem, index, removeMenuItem }) => {
  return (
    <div
      key={index}
      className="border border-gray-400 rounded-md bg-gray-300 overflow-hidden shadow-sm p-2"
    >
      <div className="flex justify-center pl-3">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="w-32 h-32 object-cover rounded-md"
        />
      </div>
      <div className="p-3">
        <p className="text-base font-semibold">name: {menuItem.name}</p>
        <p className="text-gray-600 text-sm mb-1 line-clamp-2">
          desciption: {menuItem.description}
        </p>
        <p className="text-green-600 font-semibold text-sm">
          price: ${menuItem.price}
        </p>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 mt-4 text-sm"
          onClick={() => removeMenuItem(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
