import React from "react";
import LazyLoad from "../LazzyLoad";
import Image from "next/image";

const Introduce = () => {
  return (
    <div className="bg-teal-900 w-full ">
      <div className="mx-24 py-[10%]">
        <div className="pt-[5%]  justify-center grid grid-cols-1 gap-5 md:grid-cols-2  ">
          <div className=" gap-10 mx-8">
            <LazyLoad
              threshold={0.2}
              animationDuration={0.5}
              initialStyle={{ opacity: 0, y: 30 }}
              animateStyle={{ opacity: 1, y: 0 }}
            >
              <div className="text-2xl  gap-4 md:text-5xl font-extrabold tracking-wider">
                <h1 className="text-black">High Quality Video , Audio & </h1>
                <h1 className="text-black">Live Class. </h1>
              </div>
              <div className="text-lg  md:text-2xl   text-black my-10">
                High-defination video is video of higher resolution and quality
                than standar-definition. While there is no standardized meaning
                for high-definition, generally any video image.
              </div>

              <div className="grid grid-cols-2 gap-10  md:text-2xl text-sm text-black font-semibold text-center ">
                <div className="bg-white-100 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white-100  p-6 ">
                  Audio Classes
                </div>
                <div className="bg-white-100 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white-100  p-6 ">
                  Recoded Class
                </div>
                <div className="bg-white-100 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white-100  p-6 ">
                  Live Classes
                </div>
                <div className="bg-white-100 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white-100  p-6 ">
                  50+ Notes
                </div>
              </div>
            </LazyLoad>
          </div>

          <LazyLoad
            threshold={0.2}
            animationDuration={0.5}
            initialStyle={{ opacity: 0, x: 30 }}
            animateStyle={{ opacity: 1, x: 0 }}
          >
            <div className=" border-white-100 border-[20px] w-full rounded-2xl">
              <Image
                src={
                  "https://4mlgzdj164.ufs.sh/f/Y1D5BsqL0EJaxuRORZsFukaT9jg30Hcq7nItreZ51LfyRSBv"
                }
                alt="onlTeacher"
                height={600}
                width={600}
                className="w-full object-contain"
              />
            </div>
          </LazyLoad>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
