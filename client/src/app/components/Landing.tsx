"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import background from "../asset/background.png";
import {
  TbChecklist,
  TbCalendarMonth,
  TbCoins,
  TbStarFilled,
} from "react-icons/tb";

const LoadingSkeleton = () => {
  return (
    <div className="w-3/4">
      <div className="flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg">
        <div className="basis-1/2 px-16 mx-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-4 w-96 mb-2" />
          <Skeleton className="h-4 w-72 mb-8" />
          <Skeleton className="w-40 h-10" />
        </div>
        <Skeleton className="basis-1/2 h-full rounded-r-lg" />
      </div>

      <div className="mx-auto py-12 mt-10">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-4 w-full max-w-2xl mb-8" />

        <div className="flex flex-wrap gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton className="w-24 h-6 rounded-full" key={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton className="h-[300px] rounded-lg" key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({ pageSize: 10, status: "Published" });

  console.log(courses);

  const handleCourseClick = (courseId: number) => {
    router.push(`search?id=${courseId}`, { scroll: false });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      {/* Hero section */}
      <div className="container w-full h-full">
        <section className="relative">
          {/* <Image src={background} alt="Education Background Image" /> */}
          <div className="bg-gray-600 w-screen h-screen" />
          <section className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2">
            <h1 className="font-extrabold text-3xl text-white-100 max-w-80">
              Empowering Minds, One Learner at a Time.
            </h1>
            <p className="text-gray-300 mb-5">
              Explore our wide range of courses and programs.
            </p>
            <div className="px-3 py-2 bg-gray-800 text-gray-200 rounded-xl">
              Book Your First Session Now!
            </div>
          </section>
        </section>
      </div>

      {/* Why choose us? */}
      <div className="mx-auto py-4 flex">
        <div className="flex mx-auto gap-8">
          <div className="box p-3 max-w-72 shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] rounded-xl">
            <div className="flex items-center justify-center bg-gray-700 w-12 h-12 rounded-full text-white">
              <TbStarFilled className="text-xl text-white-50" />
            </div>
            <div>
              <p className="font-bold text-2xl">Experience Tutors</p>
              <span>
                Our tutors are experienced and certified to ensure high-quality
                teaching.
              </span>
            </div>
          </div>
          <div className="box p-3 max-w-72 shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] rounded-xl">
            <div className="flex items-center justify-center bg-gray-700 w-12 h-12 rounded-full text-white">
              <TbChecklist className="text-xl text-white-50" />
            </div>
            <div>
              <p className="font-bold text-2xl">Tailored Learning Plans</p>
              <span>
                We create personalized learning plans tailored to each child's
                needs.
              </span>
            </div>
          </div>
          <div className="box p-3 max-w-72 shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] rounded-xl">
            <div className="flex items-center justify-center bg-gray-700 w-12 h-12 rounded-full text-white">
              <TbCalendarMonth className="text-xl text-white-50" />
            </div>
            <div>
              <p className="font-bold text-2xl">Flexible Scheduling</p>
              <span>
                Choose a schedule that fits your family’s lifestyle—weekends or
                evenings.
              </span>
            </div>
          </div>
          <div className="box p-3 max-w-72 shadow-[0_0_15px_2px_rgba(0,0,0,0.1)] rounded-xl">
            <div className="flex items-center justify-center bg-gray-700 w-12 h-12 rounded-full text-white">
              <TbCoins className="text-xl text-white-50" />
            </div>
            <div>
              <p className="font-bold text-2xl">Affordable Rates</p>
              <span>
                We offer affordable pricing and flexible packages to fit your
                budget.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <motion.div
  //     initial={{ opacity: 0 }}
  //     animate={{ opacity: 1 }}
  //     transition={{ duration: 0.5 }}
  //     className="w-3/4"
  //   >
  //     <motion.div
  //       initial={{ y: 20, opacity: 0 }}
  //       animate={{ y: 0, opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //       className=" flex justify-between items-center mt-12 h-[500px] rounded-lg bg-customgreys-secondarybg"
  //     >
  //       <div className="basis-1/2 px-16 mx-auto">
  //         <h1 className="text-4xl font-bold mb-4">Courses</h1>
  //         <p className="text-lg text-gray-400 mb-8">
  //           This is the list of the courses you can enroll in.
  //           <br />
  //           Courses when you need them and want them
  //         </p>
  //         <div className="w-fit">
  //           <Link href="/search" scroll={false}>
  //             <div className="bg-primary-700 hover:bg-primary-600 px-4 py-2 rounded-md">
  //               Search for Courses
  //             </div>
  //           </Link>
  //         </div>
  //       </div>
  //       <div className="basis-1/2 h-full relative overflow-hidden rounded-r-lg">
  //         {["/hero1.jpg", "/hero2.jpg", "/hero3.jpg"].map((src, index) => (
  //           <Image
  //             key={src}
  //             src={src}
  //             alt={`Hero Banner ${index + 1}`}
  //             fill
  //             priority={index === currentImage}
  //             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  //             className={`object-cover transition-opacity duration-500 opacity-0 ${
  //               index === currentImage ? "opacity-100" : ""
  //             }`}
  //           />
  //         ))}
  //       </div>
  //     </motion.div>
  //     <motion.div
  //       initial={{ y: 20, opacity: 0 }}
  //       whileInView={{ y: 0, opacity: 1 }}
  //       transition={{ duration: 0.5 }}
  //       viewport={{ amount: 0.3, once: true }}
  //       className="mx-auto py-12 mt-10"
  //     >
  //       <h2 className="text-2xl font-semibold mb-4">Feature Courses</h2>
  //       <p className="text-customgreys-dirtyGrey mb-8">
  //         From beginner to advanced, in all industries, we have the right
  //         courses just for you and preparing your entire journey for learning
  //         and making the most.
  //       </p>

  //       <div className="flex flex-wrap gap-4 mb-8">
  //         {[
  //           "web development",
  //           "enterprise IT",
  //           "react nextjs",
  //           "javascript",
  //           "backend development",
  //         ].map((tag, index) => (
  //           <span
  //             key={index}
  //             className="px-3 py-1 bg-customgreys-secondarybg rounded-full text-sm"
  //           >
  //             {tag}
  //           </span>
  //         ))}
  //       </div>

  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  //         {courses &&
  //           courses.map((course, index) => (
  //             <motion.div
  //               key={course.id}
  //               initial={{ y: 50, opacity: 0 }}
  //               whileInView={{ y: 0, opacity: 1 }}
  //               transition={{ duration: 0.5, delay: index * 0.2 }}
  //               viewport={{ amount: 0.4 }}
  //             >
  //               <CourseCardSearch
  //                 course={course}
  //                 onClick={() => handleCourseClick(course.id)}
  //               />
  //             </motion.div>
  //           ))}
  //       </div>
  //     </motion.div>
  //   </motion.div>
  // );
};

export default Landing;
