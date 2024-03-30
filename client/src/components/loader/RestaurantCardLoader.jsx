import React from 'react'

const RestaurantCardLoader = () => {
  return (
    <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden max-w-[300px] animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
}

export default RestaurantCardLoader