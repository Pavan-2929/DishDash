import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../cards/ReviewCard";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

const Rating = () => {
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
  };

  const fetchReviews = async (e) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://dishdash-server.onrender.com/api/review/get/restaurant/${params.id}`
      );
      setIsLoading(false);
      setReviews(response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://dishdash-server.onrender.com/api/review/create",
        { comment, rating, restaurantId: params.id },
        { withCredentials: true }
      );
      fetchReviews();
      toast.success("Review created successfully");
      setRating(0);
      setComment("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8 ">
        {isLoading ? <Loader /> : ""}
        <div className="bg-gray-200 rounded-md border border-gray-500 w-full max-w-2xl">
          <div className="flex justify-center py-2 border-b-2 border-gray-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`text-3xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-500"
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="p-4">
            <p className="mb-2 font-semibold">Give your thoughts</p>
            <textarea
              name=""
              id=""
              rows="2"
              className="w-full bg-white p-2 rounded-md border border-gray-400 focus:outline-none"
              placeholder="Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="mt-2 bg-amber-500 text-white py-1 px-3 rounded-md hover:bg-amber-600 focus:outline-none"
              type="button"
              onClick={submitReview}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto mt-8">
        {reviews &&
          reviews.map((review) => (
            <ReviewCard review={review} key={review._id} />
          ))}
      </div>
    </>
  );
};

export default Rating;
