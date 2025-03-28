"use client";

import React from "react";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeletion";
import { courseSubjects } from "@/lib/utils";
import { useGetCoursesQuery } from "@/state/api";

const Landing = () => {
  const router = useRouter();
  const { data: courses, isLoading } = useGetCoursesQuery({
    pageSize: 10,
    page: 1,
  });

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
          {courseSubjects &&
            courseSubjects.map((subject, index) => (
              <span
                key={index}
                className="lg:w-[100px] lg:h-[40px] text-center rounded-tr-[15px] rounded-bl-[15px] flex items-center justify-center bg-neutral-200 text-black font-semibold rounded-md text-sm hover:bg-rose-500 hover:text-white-100"
              >
                {subject.label}
              </span>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses &&
            courses.slice(0, 6).map((course, index) => (
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
