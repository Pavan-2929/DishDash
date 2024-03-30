import React, { useEffect, useState } from "react";
import { cuisineList } from "../../data/cuisineData";
import axios from "axios";
import ImageUpload from "../ImageUpload";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MenuCard from "../cards/MenuCard";
import RestaurantOrders from "../cards/RestarantOrder";
import { useNavigate } from "react-router-dom";
import RestaurantDeleteModal from "../modal/RestaurantDeleteModal";
import toast from "react-hot-toast";

const SingleRestaurant = () => {
  const params = useParams();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const [formData, setFormData] = useState({
    userId: currentUser._id,
    restaurantName: "",
    city: "",
    state: "",
    deliveryPrice: "",
    estimatedDeliveryTime: "",
    cuisines: [],
    menuItems: [],
    imageUrl: "",
  });
  const [menuName, setMenuName] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuImage, setMenuImage] = useState("");
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [orders, setOrders] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://dishdash-server.onrender.com/api/restaurant/update/${params.id}`,
        formData
      );
      navigate("/");
      toast.success("Restaurant updated successfully")
    } catch (error) {
      console.log(error);
    }
  };

  const handleCuisineChange = (cuisine) => {
    const updatedCuisines = formData.cuisines.includes(cuisine)
      ? formData.cuisines.filter((c) => c !== cuisine)
      : [...formData.cuisines, cuisine];
    setFormData({ ...formData, cuisines: updatedCuisines });
  };

  const addMenuItems = (e) => {
    e.preventDefault();

    const data = {
      name: menuName,
      price: menuPrice,
      description: menuDescription,
      imageUrl: menuImage,
    };

    setFormData({ ...formData, menuItems: [...formData.menuItems, data] });
    setMenuName("");
    setMenuDescription("");
    setMenuImage("");
    setMenuPrice("");
  };

  const removeMenuItem = (index) => {
    const updatedMenuItems = [...formData.menuItems];

    updatedMenuItems.splice(index, 1);
    setFormData({ ...formData, menuItems: updatedMenuItems });
  };

  const handleMenuImageUpload = async (image) => {
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
          setMenuImage(downloadURL)
        );
      }
    );
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/restaurant/get/${params.id}`
      );

      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  useEffect(() => {
    if (image) {
      handleMenuImageUpload(image);
    }
  }, [image]);

  const fetchOrderByRestaurntId = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/order/get/restaurantId/${params.id}`
      );


      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderByRestaurntId();
  }, []);

  return (
    <div>
      <div className="flex justify-around items-center mt-6">
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-gray-100  border shadow-md shadow-gray-500  border-gray-900"
        >
          <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-center">
            Manage Your restauarnt
          </h1>

          <div className="flex justify-center my-8">
            <img
              src={formData.imageUrl}
              className="h-[500px] w-auto rounded-md shadow-md"
              alt=""
            />
          </div>

          <div className="mb-4">
            <label htmlFor="restaurantName">Restaurant Name</label>
            <input
              type="text"
              id="restaurantName"
              value={formData.restaurantName}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="deliveryPrice">Delivery Price</label>
            <input
              type="number"
              id="deliveryPrice"
              value={formData.deliveryPrice}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="estimatedDeliveryTime">
              Estimated Delivery Time
            </label>
            <input
              type="number"
              id="estimatedDeliveryTime"
              value={formData.estimatedDeliveryTime}
              onChange={handleChange}
              className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
              required
            />
          </div>
          <div className="border-y-2 border-gray-500 mt-14">
            <div className="my-6">
              <div className="mb-4">
                <label className="text-2xl" htmlFor="cuisines">
                  Cuisines
                </label>
              </div>
              <div className="flex flex-wrap">
                {cuisineList.map((cuisine, index) => (
                  <div key={index} className="inline-block mr-4 mb-2 w-[150px]">
                    <input
                      type="checkbox"
                      id={cuisine}
                      checked={formData.cuisines.includes(cuisine)}
                      onChange={() => handleCuisineChange(cuisine)}
                      className="mr-2"
                    />
                    <label htmlFor={cuisine}>{cuisine}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ImageUpload formData={formData} setFormData={setFormData} />

          <div className="mb-4 mt-6 border-b-2 border-gray-500 pb-6  ">
            <div className="text-2xl mb-6 ">
              <p>Upload your famous dishes</p>
            </div>
            <div className="bg-gray-200 rounded-md pb-4">
              <div className="border-b-2 border-gray-400 mb-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label htmlFor="name">Dish-Name</label>
                    <input
                      type="String"
                      id="name"
                      value={menuName}
                      onChange={(e) => setMenuName(e.target.value)}
                      className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="price">Dish-price</label>
                    <input
                      type="Number"
                      id="price"
                      value={menuPrice}
                      onChange={(e) => setMenuPrice(e.target.value)}
                      className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="description">Dish-Description</label>
                  <input
                    type="text"
                    id="description"
                    value={menuDescription}
                    onChange={(e) => setMenuDescription(e.target.value)}
                    className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                  />
                </div>
                <div className="py-4">
                  <label
                    htmlFor="menuImageUpload"
                    className="cursor-pointer bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
                  >
                    Choose File
                  </label>
                  <input
                    type="file"
                    id="menuImageUpload"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {image && (
                    <div>
                      <p className="font-semibold my-6">
                        {imageError ? (
                          <span className="text-red-700">
                            Error Uploading Image (Image should be less than 2
                            MB)
                          </span>
                        ) : imagePercentage > 0 && imagePercentage < 100 ? (
                          <span className="text-yellow-500">{`Uploading ${imagePercentage}%`}</span>
                        ) : imagePercentage === 100 ? (
                          <span className="text-green-500">Image uploaded</span>
                        ) : (
                          ""
                        )}
                      </p>
                      <img src={menuImage} alt="" />
                    </div>
                  )}
                </div>
              </div>
              <div className=" flex justify-center">
                <button
                  type="submit"
                  className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
                  onClick={addMenuItems}
                >
                  Add dish
                </button>
              </div>
            </div>

            <div className="bg-gray-200 mt-14 gap-4 p-8 rounded-md">
              <div className="text-2xl mb-6 ">
                <p>Your dishes</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.menuItems.length === 0 ? (
                  <p className="text-2xl text-red-500">please add dished</p>
                ) : (
                  formData.menuItems.map((menuItem, index) => (
                    <MenuCard
                      key={index}
                      menuItem={menuItem}
                      index={index}
                      removeMenuItem={removeMenuItem}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      <div>
        <p className="text-center font-semibold text-3xl mt-12 border-t-2 border-gray-500 pt-6">
          Restaurant Orders
        </p>
        {orders &&
          orders.map((order) => (
            <RestaurantOrders order={order} key={order._id} />
          ))}
      </div>

      <div className="flex justify-center mt-14">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={toggleModal}
        >
          Want to Delete Your Restaurant?
        </button>
      </div>

      {showModal && (
        <RestaurantDeleteModal
          restaurantId={params.id}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default SingleRestaurant;
