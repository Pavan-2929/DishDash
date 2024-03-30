import axios from "axios";
import React, { useEffect, useState } from "react";

const ReviewCard = ({ review }) => {
  const [user, setUser] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/user/get/${review.userId}`
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-2"
            src={user.profilePicture}
            alt="User Avatar"
          />
          <p className="font-semibold">{user.username}</p>
        </div>
        <div className="md:text-3xl text-xl">
          {[...Array(review.rating)].map((_, index) => (
            <span key={index} className="text-yellow-500">
              ★
            </span>
          ))}
          {[...Array(5 - review.rating)].map((_, index) => (
            <span key={index + review.rating} className="text-gray-400">
              ★
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-gray-700">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
