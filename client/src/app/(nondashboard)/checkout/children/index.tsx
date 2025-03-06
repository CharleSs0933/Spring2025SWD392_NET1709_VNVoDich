import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import CourseDetails from "../_components/course-details";
import React from "react";
import Loading from "@/components/Loading";
import ChildrenSelector from "../_components/children-selector";
import { useGetChildrenQuery } from "@/state/api";

const ChildrenPage = () => {
  const {
    course,
    isError,
    isLoading: isCourseLoading,
    courseId,
  } = useCurrentCourse();

  const { data: availableChildren, isLoading: isChildrenLoading } =
    useGetChildrenQuery({});

  console.log(availableChildren);

  if (isCourseLoading || isChildrenLoading) return <Loading />;
  if (isError) return <div>Failed to fetch course data</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className=" w-full h-fit flex flex-col justify-center lg:flex-row ">
      <CourseDetails course={course} />
      <ChildrenSelector
        availableChildren={availableChildren || []}
        courseId={courseId}
      />
    </div>
  );
};

export default ChildrenPage;
