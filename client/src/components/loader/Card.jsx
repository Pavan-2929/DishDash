import { FiPlus } from "react-icons/fi";

const SkeletonLoader = () => (
  <div className="bg-gray-200 rounded-lg shadow-md overflow-hidden max-w-[300px] hover:cursor-pointer hover:border hover:border-gray-500">
    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
      <div className="bg-white rounded-full p-2">
        <FiPlus className="text-gray-400" size={32} />
      </div>
    </div>
    <div className="p-6">
      <div className="h-6 bg-gray-300 mb-2"></div>
      <div className="flex items-center mb-2 text-gray-600">
        <div className="w-4 h-4 bg-gray-300 mr-1 rounded-full"></div>
        <div className="h-4 bg-gray-300 w-16"></div>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <div className="w-4 h-4 bg-gray-300 mr-1 rounded-full"></div>
        <div className="h-4 bg-gray-300 w-20"></div>
      </div>
      <div className="flex items-center text-gray-600">
        <div className="w-4 h-4 bg-gray-300 mr-1 rounded-full"></div>
        <div className="h-4 bg-gray-300 w-24"></div>
      </div>
      <div className="mt-6">
        <div className="bg-gray-300 text-white py-2 px-4 rounded-md"></div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;
