import React from "react";
import Rating from "./Rating";

const Review = () => {
  return (
    <div className="mt-8 border-b-2 border-gray-500 pb-14">
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Please give your honest feedback
        </h2>
      </div>
      <div>
        <Rating/>
      </div>
    </div>
  );
};

export default Review;
