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
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});


  const handleCourseClick = (courseId: number) => {
    router.push(`search?id=${courseId}`, { scroll: false });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-3/4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="mx-auto py-12 mt-10"
      >
        <div className="flex flex-wrap gap-4 mb-8">
          {courses &&
            courses.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-customgreys-secondarybg rounded-full text-sm"
              >
                {tag.subject}
              </span>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses &&
            courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.id)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
