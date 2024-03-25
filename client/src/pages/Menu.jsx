import axios from "axios";
import React, { useEffect, useState } from "react";
import RestaurantCard from "../components/cards/RestaurantCard";

const Menu = () => {
  const [restaurants, setRestaurans] = useState([]);
  const fetchAllRestaurants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/restaurant/datas"
      );

      console.log(response);
      setRestaurans(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);
  return (
    <div>
      <div>
        <div className="mb-6 text-center font-bold text-3xl">
          <p>Explore Restaurants</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {restaurants &&
            restaurants.map((restaurant) => (
              <div key={restaurant._id}>
                <RestaurantCard
                  restaurant={restaurant}
                  path={`${restaurant._id}`}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
