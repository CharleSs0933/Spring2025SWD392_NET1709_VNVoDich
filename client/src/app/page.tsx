import Image from "next/image";
import React from "react";
import banner from "@/app/asset/img/banner4.jpg";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { SparklesCore } from "./components/ui/SparklesPreview";
import student1 from "@/app/asset/img/student11.png";
import onlTeacher from "@/app/asset/img/onlTeacher.jpg";
import Landing from "./components/Landing";
export default function Home() {
  const words = [
    { text: "Grow" },
    { text: "Yours" },
    { text: "Skills" },
    { text: "to" },
    { text: "Advance" },
  ];
  const words2 = [{ text: "Your" }, { text: "Career" }, { text: "Path" }];

  return (
    <div>
      <div className="relative">
        <Image
          src={banner}
          alt="banner"
          height={1000}
          width={1000}
          className="h-screen object-cover w-full opacity-20"
        />

        <div className="absolute top-52 flex items-center justify-center z-10 text-center w-full">
          <div className="text-center flex flex-col gap-20">
            <TypewriterEffect words={words} />

            <div className="h-[8rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
              <TypewriterEffect words={words2} />

              <div className=" w-[700px] h-7 relative">
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[8px] w-1/2 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-1/2" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />

                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={2000}
                  className="w-full h-full absolute top-0 left-0"
                  particleColor="#F8C8DC"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[450px]  flex items-center justify-center z-10 text-center w-full gap-5 text-lg">
          <div>No Credit Card Required</div>
          <div className="border-l-2 border h-4 w-0 border-red-500" />

          <div>7 Days Trial</div>
          <div className="border-l-2 border h-4 border-red-500" />
          <div>Free For Teachers</div>
        </div>

        <div className="absolute top-[550px] w-full flex justify-center">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-20 py-5 text-xl bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Get Started Now
            </div>
          </button>
        </div>
      </div>

      <div className="absolute top-[950px] z-10 w-full h-[450px] flex gap-7 justify-around">
        <div className="bg-yellow-300 w-1/5 relative rounded-tr-[40px] rounded-bl-[40px]  shadow-[0px_13px_6px_rgba(251,191,36,0.3)] p-6">
          <Image
            src={student1}
            alt="student1"
            height={400}
            width={330}
            className="bg-transparent object-cover absolute top-[-70px] left-16"
          />
        </div>
        <div className="bg-green-300 w-1/5 relative rounded-tr-[40px] rounded-bl-[40px]  shadow-[0px_13px_6px_rgba(134,239,172,0.3)] p-6">
          <Image
            src={student1}
            alt="student1"
            height={400}
            width={330}
            className="bg-transparent object-cover absolute top-[-70px] left-16"
          />
        </div>
        <div className="bg-blue-500 w-1/5 relative rounded-tr-[40px] rounded-bl-[40px] shadow-[0px_13px_6px_rgba(59,130,246,0.3)] p-6 ">
          <Image
            src={student1}
            alt="student1"
            height={400}
            width={330}
            className="bg-transparent object-cover absolute top-[-70px] left-16"
          />
        </div>
      </div>
      <div className="bg-gray-400 w-full h-[1200px]">
        <div className="pt-[400px] flex justify-center   ">
          <div className="w-[40%] flex flex-col gap-10">
            <div className="flex flex-col gap-4 text-5xl font-extrabold tracking-wider">
              <h1 className="text-black">High Quality Video , Audio & </h1>
              <h1 className="text-black">Live Class. </h1>
            </div>
            <div className="text-2xl w-[70%] text-black my-10">
              High-defination video is video of higher resolution and quality
              than standar-definition. While there is no standardized meaning
              for high-definition, generally any video image.
            </div>
            <button className="relative inline-flex w-[30%] h-16 overflow-hidden rounded-tr-[10px] rounded-bl-[10px] p-[5px] focus:outline-none focus:ring-2  focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-tr-[10px] rounded-bl-[10px] bg-slate-950 px-5 py-2 text-2xl font-medium text-white backdrop-blur-3xl">
                Visit Courses
              </span>
            </button>
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
          </div>

          <div className=" border-white-100 border-[20px] rounded-2xl">
            <Image
              src={onlTeacher}
              alt="onlTeacher"
              height={400}
              width={1000}
            />
          </div>
        </div>
      </div>
      <div className="bg-white-100 w-full h-[1200px]  py-40">
        <div className=" text-black text-center">
          <h1 className="text-5xl font-extrabold tracking-wider" >Our Most Popular Courses</h1>
          <p className="py-10 text-2xl">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
        <div>
          <Landing/>
        </div>
      </div>
    </div>
  );
}
