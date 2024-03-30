import React from "react";

const MenuCartLoader = () => {
  return (
    <div className="menu-card border border-gray-400 rounded-md bg-gray-100 overflow-hidden shadow-sm p-2 animate-pulse">
      <div className="flex justify-center pl-3">
        <div className="w-32 h-32 bg-gray-300 rounded-md"></div>
      </div>
      <div className="p-3 text-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 rounded mb-1"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mt-4"></div>
      </div>
    </div>
  );
};

export default MenuCartLoader;
