import React from 'react'
import LazyLoad from '../LazzyLoad'
import Image from 'next/image'
import student1 from "@/app/asset/img/student11.png";

const HomePageBody1 = () => {
  return (
    <div className="absolute top-[600px] z-10 w-full  ">
        <LazyLoad
          threshold={0.2}
          animationDuration={0.5}
          initialStyle={{ opacity: 0, x: 30 }}
          animateStyle={{ opacity: 1, x: 0 }}
        >
          <div className="flex gap-7 justify-around h-[450px]">
            <div className="bg-yellow-300 w-1/6 h-[80%] relative rounded-tr-[40px] rounded-bl-[40px]  shadow-[0px_13px_6px_rgba(251,191,36,0.3)] p-6">
              <Image 
                src={student1}
                alt="student1"
                height={400}
                width={250}
                className="bg-transparent object-cover absolute top-[-50px] right-1"
              />
            </div>
            <div className="bg-green-300 w-1/6 h-[80%] relative rounded-tr-[40px] rounded-bl-[40px]  shadow-[0px_13px_6px_rgba(134,239,172,0.3)] p-6">
              <Image
                src={student1}
                alt="student1"
                height={400}
                width={250}
                className="bg-transparent object-cover absolute top-[-50px] right-1"
              />
            </div>
            <div className="bg-blue-500 w-1/6 h-[80%] relative rounded-tr-[40px] rounded-bl-[40px] shadow-[0px_13px_6px_rgba(59,130,246,0.3)] p-6 ">
              <Image
                src={student1}
                alt="student1"
                height={400}
                width={250}
                className="bg-transparent object-cover absolute top-[-50px] right-1"
              />
            </div>
          </div>
        </LazyLoad>
      </div>

  )
}

export default HomePageBody1