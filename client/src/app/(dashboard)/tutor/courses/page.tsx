"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import Toolbar from "@/components/Toolbar";
import TutorCourseCard from "@/components/TutorCourseCard";
import { Button } from "@/components/ui/button";
import {
  //   useCreateCourseMutation,
  //   useDeleteCourseMutation,
  useGetCoursesQuery,
} from "@/state/api";
import { Course } from "@/types";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const Courses = () => {
  const router = useRouter();
  //   const { user } = useUser();
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  //   const [createCourse] = useCreateCourseMutation();
  //   const [deleteCourse] = useDeleteCourseMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  console.log(courses);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    return courses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      //   const matchesCategory =
      //     selectedCategory === "all" || course.category === selectedCategory;
      return matchesSearch;
    });
  }, [courses, searchTerm, selectedCategory]);

  const handleEdit = (course: Course) => {
    router.push(`/tutor/courses/${course.id}`, { scroll: false });
  };

  const handleDelete = async (course: Course) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      //   await deleteCourse(course.id).unwrap();
    }
  };

  const handleCreateCourse = async () => {
    // if (!user) return;
    // const result = await createCourse({
    //   teacherId: user.id,
    //   teacherName: user.fullName || "Unknown Teacher",
    // }).unwrap();
    // router.push(`/teacher/courses/${result.courseId}`, { scroll: false });
  };

  if (isLoading) return <Loading />;
  if (isError || !courses) return <div>Error loading courses.</div>;

  return (
    <div className=" w-full h-full">
      <Header
        title="Courses"
        subtitle="Browse your courses"
        rightElement={
          <Button
            className="bg-primary-700 hover:bg-primary-600"
            onClick={handleCreateCourse}
          >
            Create Course
          </Button>
        }
      />
      <Toolbar
        onSearch={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-6 w-full">
        {filteredCourses.map((course) => (
          <TutorCourseCard
            key={course.id}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwner={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
