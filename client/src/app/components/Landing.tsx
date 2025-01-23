"use client";
import { useGetCoursesQuery } from "@/state/api";
import React from "react";

const Landing = () => {
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});
  console.log(courses);
  if (isLoading) return <div>Loading...</div>;

  return <div>Home</div>;
};

export default Landing;
