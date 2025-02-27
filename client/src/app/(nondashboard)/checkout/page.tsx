"use client";

import {
  useGetChildrenQuery,
  useGetCourseAvailabilityQuery,
  useGetCourseQuery,
} from "@/state/api";
import { useSearchParams } from "next/navigation";
import React from "react";
import CoursesDetails from "./_components/course-details";
import BookingForm from "./_components/booking-form";
import Loading from "@/components/Loading";

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

  const { data: availableChildren, isLoading: isChildrenLoading } =
    useGetChildrenQuery({});

  if (isCourseLoading || isAvailabilityLoading || isChildrenLoading)
    return <Loading />;
  if (isError || !course || !availabilites)
    return <div>Failed to fetch course data</div>;

  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8 ">
      <CoursesDetails course={course} />
      <BookingForm
        course={course}
        availabilities={availabilites}
        children={availableChildren || []}
      />
    </div>
  );
};

export default CourseCheckoutPage;
