import React from 'react'

const OrderLoader = () => {
  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 border border-gray-500 animate-pulse">
      <div className="flex justify-between flex-wrap">
        <div className="w-full md:w-2/3">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="h-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="h-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="h-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="flex  gap-8">
        <div className="w-full md:w-2/3">
          <div className="h-6 bg-gray-300 rounded mt-4"></div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="h-6 bg-gray-300 rounded mt-4"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderLoader