import React, { useState } from "react";
import User from "../components/Register/User";
import { NavLink } from "react-router-dom";
import RestaurantForm from "../components/Register/Restaurant";

const Register = () => {
  const [selectUserType, setSelectUserType] = useState("user");

  const handleSelection = (type) => {
    setSelectUserType(type);
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleSelection("user")}
          className={`${
            selectUserType === "user"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md focus:outline-none`}
        >
          User
        </button>
        <button
          onClick={() => handleSelection("restaurant")}
          className={`${
            selectUserType === "restaurant"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-r-md focus:outline-none`}
        >
          Restaurant
        </button>
      </div>
      {selectUserType && selectUserType === "user" ? (
        <User />
      ) : (
        <RestaurantForm />
      )}
    </div>
  );
};

export default Register;
