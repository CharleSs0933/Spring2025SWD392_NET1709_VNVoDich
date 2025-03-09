"use client";

import Loading from "@/components/Loading";
import { useGetCourseAvailabilityQuery } from "@/state/api";
import React from "react";
import BookingForm from "../_components/booking-form";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";

const SchedulePage = () => {
  const {
    course,
    isError,
    isLoading: isCourseLoading,
    courseId,
  } = useCurrentCourse();

  const { data: availabilites, isLoading: isAvailabilityLoading } =
    useGetCourseAvailabilityQuery({ courseId }, { skip: !courseId });

  if (isCourseLoading || isAvailabilityLoading) return <Loading />;
  if (isError) return <div>Failed to fetch course data</div>;
  if (!course || !availabilites) return <div>Course not found</div>;

  return (
    <div className=" w-full h-fit">
      <BookingForm availabilities={availabilites} course={course} />
    </div>
  );
};

export default SchedulePage;
