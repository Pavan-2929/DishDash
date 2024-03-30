import React, { useState } from "react";
import RegisterImage from "../assets/RegisterImage.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import GoogleAuth from "../components/GoogleAuth";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dishdash-server.onrender.com/api/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("LoggedIn Successfully", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
      } else {
        toast.error("Enter valid Information", {
          style: {
            borderRadius: "10px",
            background: "#282828",
            color: "#fff",
          },
        });
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
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
    <div className="flex justify-around mt-6 ">

      <form
        onSubmit={handleSubmitLogin}
        className="w-full lg:w-1/2 sm:p-14 p-6 rounded-lg mt-4 font-semibold bg-gray-100 border shadow-md shadow-gray-500  border-gray-900"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-10 ">
          Login with your account
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full p-2 bg-gray-300 text-black rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="block sm:flex justify-between items-center">
          <div>
            <button
              type="submit"
              className="bg-amber-500 text-white p-2 mt-5 hover:bg-amber-600 rounded focus:outline-none mr-10"
            >
              Login Now
            </button>
            <GoogleAuth />
          </div>
          <div className="flex items-center text-[1.2rem]">
            <div className="mt-5">
              <h3 className="text-black">Create an account?</h3>
            </div>
            <NavLink
              to="/register"
              className=" text-black p-2 mt-5 underline rounded ml-2 focus:outline-none hover:text-gray-700"
            >
              Register
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
