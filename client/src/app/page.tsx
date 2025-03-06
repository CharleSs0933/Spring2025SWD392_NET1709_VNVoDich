"use client";

import React from "react";
import { TypewriterEffect } from "./component/ui/typewriter-effect";
import { SparklesCore } from "./component/ui/SparklesPreview";
import LazyLoad from "./component/LazzyLoad";
import TutorProfessinal from "./component/HomePage/TutorProfessinal";
import About from "./component/HomePage/About";
import Introduce from "./component/HomePage/Introduce";
import Header from "./component/Header";
import Footer from "./component/Footer";
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
      <Header />
      <div className="relative">
        <video
          src={
            "https://www.shutterstock.com/shutterstock/videos/1092924437/preview/stock-footage-collage-of-diverse-many-happy-teen-kids-tapping-on-devices-learning-onling-at-school-elementary.webm"
          }
          height={1000}
          width={1000}
          autoPlay
          loop
          muted
          className="h-screen object-cover w-full opacity-40 pointer-events-none"
        />

        <div className="absolute top-52 flex items-center justify-center z-10 text-center w-full">
          <div className="text-center flex flex-col gap-5 md:gap-14 lg:gap-20">
            <TypewriterEffect words={words} />

            <div className="h-[8rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
              <TypewriterEffect words={words2} />

              <div className=" w-full h-7 relative">
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

        <div className="absolute top-[420px]  z-10 text-center w-full text-sm md:text-md lg:text-lg">
          <LazyLoad
            threshold={0.2}
            animationDuration={0.5}
            initialStyle={{ opacity: 0, y: 30 }}
            animateStyle={{ opacity: 1, y: 0 }}
          >
            <div className=" flex items-center justify-center gap-5">
              <div>No Credit Card Required</div>
              <div className="border-l-2 border h-4 w-0 border-red-500" />

              <div>7 Days Trial</div>
              <div className="border-l-2 border h-4 border-red-500" />
              <div>Free For Teachers</div>
            </div>
          </LazyLoad>
        </div>

        <div className="absolute top-[480px] w-full ">
          <LazyLoad
            threshold={0.2}
            animationDuration={0.5}
            initialStyle={{ opacity: 0, y: -30 }}
            animateStyle={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center">
              <button className="relative inline-flex  h-16 overflow-hidden rounded-md p-[5px] focus:outline-none focus:ring-2  focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-5 py-2 text-sm md:text-lg lg:text-2xl font-medium text-white backdrop-blur-3xl">
                  Get Started Now
                </span>
              </button>
            </div>
          </LazyLoad>
        </div>
      </div>

      {/* <About /> */}
      <Introduce />
      <TutorProfessinal />
      <Footer />
    </div>
  );
}
