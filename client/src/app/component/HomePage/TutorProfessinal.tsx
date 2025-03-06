import React from "react";
import TutorCard from "../TutorCard";
import LazyLoad from "../LazzyLoad";

const TutorProfessinal = () => {
  return (
    <LazyLoad
      threshold={0.2}
      animationDuration={0.5}
      initialStyle={{ opacity: 0, y: 30 }}
      animateStyle={{ opacity: 1, y: 0 }}
    >
      <div className="bg-transparent mx-32">
        <div className="flex justify-center my-10 items-center">
          <div className="">
            <h1 className="text-orange-600 font-bold text-2xl md:text-4xl  text-center tracking-widest">
              Meet With Our Professional Menter.
            </h1>
          </div>
        </div>
        <LazyLoad
          threshold={0.2}
          animationDuration={0.5}
          initialStyle={{ opacity: 0, x: 30 }}
          animateStyle={{ opacity: 1, x: 0 }}
        >
          <TutorCard />
        </LazyLoad>
      </div>
    </LazyLoad>
  );
};

export default TutorProfessinal;
