import axios from "axios";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../../redux/auth/authSlice";

const UserDeleteModal = ({ toggleDeleteModal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        "https://dishdash-server.onrender.com/api/auth/delete",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/login");
        dispatch(logout());
        toast.success("User deleted Successfully");
      } else {
        toast.error("Something went wrong");
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-200 text-black p-6 md:p-10 rounded-lg shadow-lg md:w-[40vw] w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold">Are you sure?</h2>
          <span
            className="cursor-pointer text-xl p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            onClick={toggleDeleteModal}
          >
            <FaTimes />
          </span>
        </div>
        <div>
          <button
            onClick={handleDeleteUser}
            className="bg-[#e93535] hover:bg-[#f84f4f] text-white px-4 py-2 rounded-md text-lg transition duration-300 mr-2"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={toggleDeleteModal}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full text-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDeleteModal;
