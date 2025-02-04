"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { useGetCoursesQuery } from "@/lib/features/api/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeletion";
import { useDispatch } from "react-redux";
import { addCourse } from "@/lib/features/courses/coursesSlice";


const Landing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentImage = useCarousel({ totalImages: 3 });
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetCoursesQuery({ pageSize: 10 , page: 1});
 useEffect(() => {
  if(courses){
    dispatch(addCourse(courses))
  }
 }, [courses , dispatch])
  const handleCourseClick = (courseId: number) => {
    router.push(`search?id=${courseId}`, { scroll: false });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="mx-auto py-7"
      >
        <div className="flex  gap-9 mb-8 justify-center items-center">
          {courses &&
            courses.map((tag, index) => (
              <span
                key={index}
                className="lg:w-[100px] lg:h-[40px] text-center rounded-tr-[15px] rounded-bl-[15px] flex items-center justify-center bg-neutral-200 text-black font-semibold rounded-md text-sm hover:bg-rose-500 hover:text-white-100"
              >
                {tag.subject}
              </span>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses &&
            courses.slice(0,6).map((course, index) => (
              <div key={course.id}>
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.id)}
                />
              </div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
