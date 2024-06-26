import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const response = await axios.post(
        "https://dishdash-server.onrender.com/api/auth/google",
        {
          username: result.user.displayName,
          email: result.user.email,
          profilePicture: result.user.photoURL,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(login());
        navigate("/");
        toast.success("LoggedIn Successfully");
      } else {
        toast.error("Enter valid Information");
        console.log(`Unexpected status code: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <button
      type="submit"
      onClick={handleGoogleClick}
      className="bg-red-500 text-white p-2 mt-5 hover:bg-red-700 rounded"
    >
      Google
    </button>
  );
};

export default GoogleAuth;
