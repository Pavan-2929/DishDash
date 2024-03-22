import React from "react";

const Hero = () => {
  return (
    <section className="hero flex flex-wrap justify-center items-center w-[90vw] mx-auto">
      <div className="py-8 md:py-12 md:w-1/2 text-center">
        <h1 className="text-4xl font-semibold">
          Everything is
          <br />
          better with a&nbsp;
          <span className="text-primary">Good Meal</span>
        </h1>
        <p className="my-6 text-gray text-lg">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life. There is nothing quite like the satisfaction of
          a warm, cheesy slice fresh out of the oven.
        </p>
        <div className="flex gap-4 text-sm justify-center">
          <button className="flex justify-center  uppercase items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
            Order now
          </button>
          <button className="flex items-center border-0 gap-2 text-gray-600 bg-gray-200 font-semibold px-4 py-2  rounded-full">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
