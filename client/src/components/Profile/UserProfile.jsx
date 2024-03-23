import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import toast from "react-hot-toast";
import { logout, setUser } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router-dom";
import indianStates from "../../data/stateData";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const currentUser = useSelector((state) => state.currentUser);

  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    profilePicture: currentUser?.profilePicture || "",
    phoneNo: currentUser?.phoneNo || "",
    address: {
      street: currentUser?.address?.street || "",
      city: currentUser?.address?.city || "",
      zipcode: currentUser?.address?.zipcode || "",
      state: currentUser?.address?.state || "",
    },
  });
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const handleChange = (e) => {
    if (
      e.target.id === "street" ||
      e.target.id === "zipcode" ||
      e.target.id === "city" ||
      e.target.id === "state"
    ) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.id]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleStateChnage = (e) => {
    setSelectedState(e.target.value);

    setFormData({
      ...formData,
      address: { ...formData.address, [e.target.id]: e.target.value },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/update",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch(setUser(formData));
        toast.success("Profile updated Sucessfully", {
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
      toast.error(`${error.response.data.message}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const handlefileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadtask = uploadBytesResumable(storageRef, image);

    uploadtask.on(
      "state_changed",
      (snapShot) => {
        const progress =
          (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadtask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  useEffect(() => {
    if (image) {
      handlefileUpload(image);
    }
  }, [image]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(logout());
        dispatch(setUser(null));
        navigate("/login");
        toast.success("Logout Successfully", {
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
      toast.error(`${error}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/auth/delete",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/login");
        dispatch(logout());
        toast.success("User deleted Successfully", {
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
      toast.error(`${error}`, {
        style: {
          borderRadius: "10px",
          background: "#282828",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="flex justify-around mt-6">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 sm:p p-6 rounded-lg font-semibold bg-gray-100 border shadow-md shadow-gray-500  border-gray-900"
      >
        <h1 className="sm:text-5xl text-4xl font-bold mb-10 text-center">
          Your Profile
        </h1>

        <div>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture}
            alt="Profile"
            className="rounded-full w-20 h-20 object-cover mx-auto mb-4"
            onClick={() => fileRef.current.click()}
          />
          <p className="font-semibold">
            {imageError ? (
              <span className="text-red-700">
                Error Uploading Image (Image should be less than 2 MB)
              </span>
            ) : imagePercentage > 0 && imagePercentage < 100 ? (
              <span className="text-yellow-500">{`Uploading ${imagePercentage}%`}</span>
            ) : imagePercentage === 100 ? (
              <span className="text-green-500">Image uploaded</span>
            ) : (
              ""
            )}
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            disabled
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Phone Number</label>
          <input
            type="text"
            id="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="street">Street Line</label>
            <input
              type="text"
              id="street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formData.address.city}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="zipcode">Zipcode</label>
            <input
              type="text"
              id="zipcode"
              value={formData.address.zipcode}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="state">State</label>
            <select
              id="state"
              value={selectedState}
              onChange={handleStateChnage}
              className="w-full p-2 bg-gray-300 text-black focus:bg-none rounded-md border-2 border-gray-500"
            >
              <option value="">{formData.address.state}</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            className="bg-amber-500 text-white p-2 mt-2 hover:bg-amber-600 rounded"
          >
            Update Profile
          </button>
        </div>
        <div className="flex justify-between mt-4 text-[1.2rem] =">
          <div
            className="cursor-pointer underline text-red-500 hover:text-red-600"
            onClick={handleLogout}
          >
            Signout
          </div>
          <div
            className="cursor-pointer underline text-red-500 hover:text-red-600"
            onClick={handleDeleteUser}
          >
            Delete Account
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
