import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/authSlice";
import { NavLink, useNavigate } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("Registration Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-around items-center mt-6">
      <form
        onSubmit={handleSubmitRegister}
        className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-gray-100  border shadow-md shadow-gray-500  border-gray-900"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-center">
          Register with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-amber-500 text-white p-2 mt-5 hover:bg-amber-600 rounded focus:outline-none mr-10"
            >
              Register Now
            </button>
            <GoogleAuth />
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3>Have an account?</h3>
            </div>
            <NavLink
              to="/login"
              className=" p-2 mt-5 underline rounded ml-2 focus:outline-none hover:text-gray-700"
            >
              Login
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
