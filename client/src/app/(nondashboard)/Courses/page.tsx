"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetCoursesQuery } from "@/state/api";
import { FocusCards } from "../../component/ui/focus-cards";
import searchCourses from "../../component/searchCourses";
import gsap from "gsap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Search from "@/app/component/search";
const Page = () => {
  const [page, setPage] = useState(1);
  const [tagSelect, setTagSelect] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const pageSize = 6;
  const { data: courses, isLoading, isError } = useGetCoursesQuery({ pageSize, page });
  const containerRef = useRef(null);

  

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
      );
    }
  }, []);

  const coursesFilter = courses
  ? searchCourses({ courses, tagSelect: tagSelect || "", searchTerm })
  : [];

  if (isLoading) {
    return (
      <div className="text-center text-lg text-gray-600">Loading courses...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">
        Error loading courses. Please try again later.
      </div>
    );
  }
  
  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (courses && courses.length === pageSize) setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // const handleTagClick = (tag: string) => {
  //   if (tag === tagSelect) {
  //     setTagSelect("");
  //   } else {
  //     setTagSelect(tag);
  //   }
  // };



  return (
    <div ref={containerRef} className="w-full mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-300 mb-4 font-serif tracking-widest">
          Master New Skills
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of premium courses taught by industry
          experts
        </p>
        
        <Search courses={courses}/>
        
      </div>

      {isLoading && (
        <div className="text-center text-lg text-gray-600">Loading courses...</div>
      )}
      {isError && (
        <div className="text-center text-red-600">
          Error loading courses. Please try again later.
        </div>
      )}

      <FocusCards data={coursesFilter} type="course" />

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
          disabled={courses &&  courses?.length < pageSize || coursesFilter.length < pageSize }
          className="px-4 py-2 mx-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
