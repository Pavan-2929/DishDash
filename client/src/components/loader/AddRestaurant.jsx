import { FiPlus } from "react-icons/fi";

const AddRestaurant = () => (
  <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden max-w-[300px] skeleton-loader">
    <div className="relative">
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
        <div className="border-2 border-gray-500 p-1 rounded-full">
          <FiPlus className="text-gray-500 text-3xl border-4 border-gray-300 rounded-full" />
        </div>
      </div>
    </div>
    <div className="p-6">
      <div className="text-xl font-semibold mb-2 bg-gray-300 h-6 w-3/4"></div>
      <div className="flex items-center mb-2 text-gray-600">
        <div className="bg-gray-300 h-4 w-4 mr-1 rounded-full"></div>
        <div className="bg-gray-300 h-4 w-20"></div>
      </div>
      <div className="flex items-center mb-4 text-gray-600">
        <div className="bg-gray-300 h-4 w-4 mr-1 rounded-full"></div>
        <div className="bg-gray-300 h-4 w-20"></div>
      </div>
      <div className="flex items-center mb-4 text-gray-600">
        <div className="bg-gray-300 h-4 w-4 mr-1 rounded-full"></div>
        <div className="bg-gray-300 h-4 w-20"></div>
      </div>
      <div className="flex items-center text-gray-600">
        <div className="bg-gray-300 h-4 w-16"></div>
      </div>
      <div className="mt-6 mb-4">
        <div className="bg-gray-300 h-10 w-24 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default AddRestaurant;
