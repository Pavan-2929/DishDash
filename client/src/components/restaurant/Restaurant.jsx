import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "../cards/RestaurantCard";
import AddRestaurant from "../loader/AddRestaurant";

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(
        "https://dishdash-server.onrender.com/api/restaurant/owner/get",
        { withCredentials: true }
      );


      setRestaurants(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div>
      <div className="text-2xl mb-6 text-center">
        <p>Your restaurants</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {restaurants &&
          restaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <RestaurantCard
                restaurant={restaurant}
                path={`manage/${restaurant._id}`}
                fetchRestaurants={fetchRestaurants}
              />
            </div>
          ))}
        <Link to="/restaurant/create">
          <AddRestaurant />
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
