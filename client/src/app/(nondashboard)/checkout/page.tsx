"use client";

import { useGetCourseAvailabilityQuery, useGetCourseQuery } from "@/state/api";
import { notFound, useSearchParams } from "next/navigation";
import React from "react";
import CoursesDetails from "./_components/course-details";
import BookingForm from "./_components/booking-form";

const CourseCheckoutPage = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id") ?? "";

  const {
    data: course,
    isLoading: isCourseLoading,
    isError,
  } = useGetCourseQuery(courseId, { skip: !courseId });

  const { data: availabilites, isLoading: isAvailabilityLoading } =
    useGetCourseAvailabilityQuery({ courseId }, { skip: !courseId });

  if (isCourseLoading || isAvailabilityLoading) return <div>Loading...</div>;
  if (isError || !course || !availabilites)
    return <div>Failed to fetch course data</div>;

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8 ">
      <CoursesDetails course={course} />
      <BookingForm course={course} availabilities={availabilites} />
    </div>
  );
};

export default CourseCheckoutPage;
