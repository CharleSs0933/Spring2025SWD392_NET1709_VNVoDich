"use client";
import { FocusCards } from "@/app/components/ui/focus-cards";
import { useGetTutorsQuery } from "@/state/api";
import React from "react";

const page = () => {
  const { data: tutors, isLoading, isError } = useGetTutorsQuery({});
  return (
    <div className=" my-5">
      <h1 className="text-5xl text-center font-bold text-gray-300 mb-4 font-serif tracking-widest">
        Master New Skills
      </h1>
      <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
        Explore our curated collection of premium courses taught by industry
        experts
      </p>
      <FocusCards data={tutors || []} type="tutor" />
    </div>
  );
};

export default page;
