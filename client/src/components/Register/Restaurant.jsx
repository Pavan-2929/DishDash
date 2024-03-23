import React, { useState } from "react";
import { cuisineList } from "../../data/cuisineData";
import axios from "axios";
import ImageUpload from "../ImageUpload";

const RestaurantForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/restaurant/create",
        formData
      );

      console.log(response);
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
    };

    setFormData({ ...formData, menuItems: [...formData.menuItems, data] });
  };

  const removeMenuItem = (index) => {
    const updatedMenuItems = [...formData.menuItems];

    updatedMenuItems.splice(index, 1);
    setFormData({ ...formData, menuItems: updatedMenuItems });
  };

  console.log(formData);

  return (
    <div className="flex justify-around items-center mt-6">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 sm:p-8 p-4 rounded-lg mt-4 font-semibold bg-gray-100  border shadow-md shadow-gray-500  border-gray-900"
      >
        <h1 className="sm:text-5xl text-3xl font-bold mb-6 text-center">
          Register as restaurant
        </h1>
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
          <label htmlFor="estimatedDeliveryTime">Estimated Delivery Time</label>
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

        <div className="mb-4 mt-6 border-b-2 border-gray-500 pb-6 bg-gray-200 p-4">
          <div className="text-2xl mb-6 ">
            <p>Upload your famous dishes</p>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="name">Dish-Name</label>
                <input
                  type="String"
                  id="name"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  className="w-full p-2 bg-gray-300 focus:bg-none rounded-md border-2 border-gray-500"
                  required
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
                  required
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
                required
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600 mb-4"
              onClick={addMenuItems}
            >
              Add dish
            </button>
          </div>

          <div>
            {formData.menuItems.map((menuItem, index) => (
              <div
                key={index}
                className="border border-gray-400 p-4 mb-4 rounded-md"
              >
                <p className="font-bold">{menuItem.name}</p>
                <p className="text-gray-600">{menuItem.description}</p>
                <p className="font-semibold">{menuItem.price}</p>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mt-2"
                  onClick={() => removeMenuItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-amber-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantForm;
