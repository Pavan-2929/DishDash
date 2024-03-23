import React, { useState } from "react";
import RestaurantForm from "../components/Profile/Restaurant";
import UserProfile from "../components/Profile/UserProfile";

const Profile = () => {
  const [selectUserType, setSelectUserType] = useState("userProfile");

  const handleSelection = (type) => {
    setSelectUserType(type);
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleSelection("userProfile")}
          className={`${
            selectUserType === "userProfile"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md focus:outline-none transition-all duration-300 hover:scale-105`}
        >
          User
        </button>
        <button
          onClick={() => handleSelection("restaurant")}
          className={`${
            selectUserType === "restaurant"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-r-md focus:outline-none transition-all duration-300 hover:scale-105`}
        >
          Restaurant
        </button>
      </div>
      {selectUserType && selectUserType === "userProfile" ? (
        <UserProfile />
      ) : (
        <RestaurantForm />
      )}
    </div>
  );
};

export default Profile;
