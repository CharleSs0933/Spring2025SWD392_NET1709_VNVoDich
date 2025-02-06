import React from 'react'
import LazyLoad from '../LazzyLoad'
import Image from 'next/image'
import onlTeacher from "@/app/asset/img/onlTeacher.jpg";

const HomePageBody2 = () => {
  return (
    <div className="bg-gray-400 w-full h-[850px]">
    <div className="mx-24">
      <div className="pt-[300px] flex justify-center   ">
        <div className="w-[50%] flex flex-col gap-10 mx-8">
      <LazyLoad threshold={0.2} animationDuration={0.5} initialStyle={{opacity : 0 , y: 30}} animateStyle={{opacity : 1 , y:0}}>
          <div className="flex flex-col gap-4 text-5xl font-extrabold tracking-wider">
            <h1 className="text-black">High Quality Video , Audio & </h1>
            <h1 className="text-black">Live Class. </h1>
          </div>
          <div className="text-2xl w-[70%] text-black my-10">
            High-defination video is video of higher resolution and quality
            than standar-definition. While there is no standardized meaning
            for high-definition, generally any video image.
          </div>
        
          <div className="grid grid-cols-2 gap-10 text-2xl text-black font-semibold text-center w-[80%]">
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
          <div className=" border-white-100 border-[20px] rounded-2xl">
            <Image
              src={onlTeacher}
              alt="onlTeacher"
              height={600}
              width={600}
            />
          </div>
        </LazyLoad>
      </div>
    </div>
  </div>
  )
}

export default HomePageBody2