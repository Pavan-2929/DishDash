import axios from "axios";
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/cards/RestaurantCard";
import MenuCart from "../components/cards/MenuCart";
import RestaurantCardLoader from "../components/loader/RestaurantCardLoader";
import MenuCartLoader from "../components/loader/MenuCartLoader";

const Menu = () => {
  const [restaurants, setRestaurans] = useState([]);

  const [selectUserType, setSelectUserType] = useState("restaurants");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelection = (type) => {
    setSelectUserType(type);
  };
  const fetchAllRestaurants = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://dishdash-server.onrender.com/api/restaurant/datas"
      );
      setRestaurans(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);
  return (
    <div>
      <div className="flex justify-center mb-8 border-b-2 border-gray-500 pb-8">
        <button
          onClick={() => handleSelection("restaurants")}
          className={`${
            selectUserType === "restaurants"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md focus:outline-none transition-all duration-300 hover:scale-105`}
        >
          Restaurant
        </button>
        <button
          onClick={() => handleSelection("menuitmes")}
          className={`${
            selectUserType === "menuitmes"
              ? "bg-amber-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-r-md focus:outline-none transition-all duration-300 hover:scale-105`}
        >
          Menu-Items
        </button>
      </div>
      {selectUserType === "restaurants" ? (
        <div>
          <div className="mb-6 text-center font-bold text-3xl">
            <p>Explore Restaurants</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {restaurants && isLoading ? (
              <>
                <RestaurantCardLoader />
                <RestaurantCardLoader />
                <RestaurantCardLoader />
              </>
            ) : (
              <>
                {restaurants.map((restaurant) => (
                  <div key={restaurant._id}>
                    <RestaurantCard
                      restaurant={restaurant}
                      path={`${restaurant._id}`}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6 text-center font-bold text-3xl">
            <p>Explore MenuItems</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-8">
            {restaurants && isLoading ? (
              <>
              <MenuCartLoader/>
              <MenuCartLoader/>
              <MenuCartLoader/>
              <MenuCartLoader/>
              </>
            ) : (
              <>
                {" "}
                {restaurants.map((restaurant) =>
                  restaurant.menuItems.map((menuItem, index) => (
                    <MenuCart
                      menuItem={menuItem}
                      key={index}
                      restaurantId={restaurant._id}
                    />
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
