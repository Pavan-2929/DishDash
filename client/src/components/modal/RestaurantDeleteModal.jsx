import axios from "axios";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RestaurantDeleteModal = ({ toggleModal, restaurantId }) => {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `https://dishdash-server.onrender.com/api/restaurant/delete/${restaurantId}`,
        {
          withCredentials: true,
        }
      );

      toast.success("restaurant deleted successfully");
      navigate("/restaurant");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 text-black p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Are you sure?</h2>
          <span
            className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={toggleModal}
          >
            <FaTimes />
          </span>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-[#e93535] hover:bg-[#f84f4f] text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDeleteModal;
