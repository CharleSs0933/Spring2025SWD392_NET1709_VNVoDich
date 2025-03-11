import React from "react";
import LazyLoad from "../LazzyLoad";
import Landing from "../Landing";

const HomePageBody3 = () => {
  return (
    <div className="bg-white-100 w-full   py-10">
      <LazyLoad
        threshold={0.2}
        animationDuration={0.5}
        initialStyle={{ opacity: 0, y: 30 }}
        animateStyle={{ opacity: 1, y: 0 }}
      >
        <div className=" text-black text-center ">
          <h1 className="text-5xl font-extrabold tracking-wider">
            Our Most Popular Courses
          </h1>
          <p className="py-4 text-2xl w-1/2 mx-auto">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div>
          <Landing />
        </div>
      </LazyLoad>
    </div>
  );
};

export default HomePageBody3;
