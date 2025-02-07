"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useGetCoursesQuery, useGetTutorsQuery } from "@/lib/features/api/api";
import { FocusCards } from "../components/ui/focus-cards";
import searchCourses from "../components/searchCourses";
import gsap from "gsap";
const Page = () => {
  const [page, setPage] = useState(1);
  const [tagSelect, setTagSelect] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const pageSize = 4;
  const { data: tutors } = useGetTutorsQuery({});
  const { data: courses, isLoading, isError } = useGetCoursesQuery({ pageSize, page });
  const containerRef = useRef(null);
  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (courses && courses.length === pageSize) setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagClick = (tag: string) => {
    if (tag === tagSelect) {
      setTagSelect("");
    } else {
      setTagSelect(tag);
    }
  };

  useLayoutEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power3.inOut" }
    );
  }, [])

  const coursesFilter = searchCourses({
    courses,
    tagSelect : tagSelect || "",
    searchTerm,
  })
  return (
    <div ref={containerRef} className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-300 mb-4 font-serif tracking-widest">
          Master New Skills
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Explore our curated collection of premium courses taught by industry
          experts
        </p>
        
        <div className="flex justify-center mt-6">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex gap-4 mt-6 justify-center items-center flex-wrap">
          {courses &&
            courses.map((tag, index) => (
              <button
                onClick={() => handleTagClick(tag.subject)}
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-semibold bg-neutral-200 text-black hover:bg-rose-500 hover:text-white transition ${
                  tag.subject === tagSelect ? "bg-rose-500 text-white" : ""
                }`}
              >
                {tag.subject}
              </button>
            ))}
        </div>
      </div>

      {isLoading && (
        <div className="text-center text-lg text-gray-600">Loading courses...</div>
      )}
      {isError && (
        <div className="text-center text-red-600">
          Error loading courses. Please try again later.
        </div>
      )}

      <FocusCards courses={coursesFilter} tutors={tutors || []} />

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
