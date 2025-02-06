"use client";
import React from "react";
import Image from "next/image";
import { useGetCoursesQuery } from "@/state/api"; // API hook
import BannerCourses from "../asset/backgroundCourse.png";

const CourseDetail = () => {
  // Giả sử muốn hiển thị thông tin khóa học với ID 1
  const courseId = 1;

  // Fetch dữ liệu từ API
  const {
    data: courses,
    isLoading,
    error,
  } = useGetCoursesQuery({ pageSize: 1 });
  console.log(courses);
  // Lấy chi tiết khóa học với ID tương ứng
  const course = courses?.find((item) => item.id === courseId);

  // Loading/Error State
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching course details.</p>;
  if (!course) return <p>Course not found.</p>;

  return (
    <div className="relative w-full h-auto">
      {/* Background Image */}
      <Image
        src={BannerCourses}
        alt="Course Detail Background"
        layout="fill"
        objectFit="cover"
        priority
        className="h-96"
      />

      {/* Overlay Content */}
      <div
        className="absolute inset-0 flex flex-col items-center
      justify-center text-white "
      >
        <h1 className="text-5xl font-bold">{course.title}</h1>
        <p className="text-lg mt-3 max-w-xs text-center">
          {course.description}
        </p>
      </div>

      {/* Course Detail Content */}
      <div className="mt-6 px-8">
        <h2 className="text-2xl font-bold mb-4">Course Information</h2>
        <p className="mb-2">
          <strong>Price:</strong> ${course.price}
        </p>
        <p className="mb-2">
          <strong>Total Lessons:</strong> {course.total_lessons}
        </p>
        <p className="mb-2">
          <strong>Grade:</strong> {course.grade}
        </p>
        <p className="mb-2">
          <strong>Subject:</strong> {course.subject}
        </p>
        <p className="mb-2">
          <strong>Status:</strong> {course.status}
        </p>

        <h3 className="text-xl font-bold mt-6 mb-2">Tutor Information</h3>
        {/* <div className="flex items-center gap-4">
          <Image
            src={course.tutor.image || "/default-avatar.png"}
            alt="Tutor"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <p className="font-bold">{course.tutor.bio}</p>
            <p>{course.tutor.qualifications}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CourseDetail;
