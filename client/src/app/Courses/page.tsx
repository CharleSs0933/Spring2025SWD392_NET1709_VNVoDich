"use client";
import React, { useState } from "react";
import { useGetCoursesQuery, useGetTutorsQuery } from "@/lib/features/api/api";
import Image from "next/image";
import { motion } from "framer-motion";
import imgBg from "@/app/asset/img/khoahoc.jpg";

const Page = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data: tutors } = useGetTutorsQuery({});
  const { data: courses, isLoading, isError } = useGetCoursesQuery({ pageSize, page });

  // Animation variants
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  // Các hàm chuyển trang
  const handlePrevious = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    // Nếu số khóa học trả về ít hơn pageSize, có thể đây là trang cuối
    if (courses && courses.length === pageSize) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-300 mb-4 font-serif tracking-widest">
          Master New Skills
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of premium courses taught by industry experts
        </p>
      </div>

      {isLoading && (
        <div className="text-center text-lg text-gray-600">Loading courses...</div>
      )}

      {isError && (
        <div className="text-center text-red-600">Error loading courses. Please try again later.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses?.map((course, index) => {
          const tutor = tutors?.find((t) => t.id === course.tutor_id);
          const coursePulbic = courses?.find((c) => c.status === 'Published')
          return (
            <motion.div 
              key={index}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-white-100 transition-all duration-300 group">
                <div className="relative h-72 group">
                  <Image
                    src={imgBg || "/default-course.jpg"}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="object-cover w-full h-[450px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {coursePulbic?.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{coursePulbic?.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{coursePulbic?.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-gray-700 text-sm font-medium">${coursePulbic?.price}</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-gray-700 text-sm font-medium">{coursePulbic?.total_lessons} Lessons</span>
                    </div>
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-gray-700 text-sm font-medium">Grade {coursePulbic?.grade}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-yellow-600">
                          {tutor?.full_name || "Expert Tutor"}
                        </p>
                        <p className="text-sm text-gray-500">Professional Instructor</p>
                      </div>
                    </div>
                    <button className="flex items-center justify-center bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-red-100 hover:text-black transition-colors">
                      <span className="mr-2">Enroll</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={handlePrevious} 
          disabled={page === 1} 
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 text-white-100">Page {page}</span>
        <button 
          onClick={handleNext} 
          disabled={courses && courses.length < pageSize} 
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
