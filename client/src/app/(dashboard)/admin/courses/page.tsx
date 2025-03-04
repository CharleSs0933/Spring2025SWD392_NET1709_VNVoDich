"use client";

import CustomTable from "@/app/component/CustomTable";
import { useGetCoursesQuery } from "@/state/api";
import React, { useEffect, useState } from "react";

interface Course {
  id: number;
  title?: string;
  price?: number;
  total_lessons?: number;
  subject?: string;
  tutor_id?: number;
  tutor?: {
    profile?: {
      full_name?: string;
      phone?: string;
    };
  };
}

const ManagementCourses = () => {
  const { data: courseFilter, isLoading: isLoadingFilter } = useGetCoursesQuery(
    {}
  );

  console.log(courseFilter);

  // Ensure all fields are always defined
  const [course, setCourse] = useState<
    {
      id: number;
      title: string;
      price: number;
      subject: string;
      total_lessons: number;
      tutor_id: number;
      full_name: string;
      phone: string;
    }[]
  >([]);
  useEffect(() => {
    if (courseFilter) {
      const transformedUsers = (courseFilter as Course[]).map((cor) => ({
        id: cor.id,
        title: cor.title ?? "",
        price: cor.price ?? 0,
        subject: cor.subject ?? "",
        total_lessons: cor.total_lessons ?? 0,
        tutor_id: cor.tutor_id ?? 0,
        full_name: cor.tutor?.profile?.full_name ?? "Unknown",
        phone: cor.tutor?.profile?.phone ?? "N/A",
      }));
      setCourse(transformedUsers);
    }
  }, [courseFilter]);
  const handleDelete = (id: number) => {
    setCourse(course.filter((cor) => cor.id !== id));
  };

  const handleUpdate = (id: number) => {
    alert(`Update user with ID: ${id}`);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses List</h1>
      {isLoadingFilter ? (
        <p>Loading ...</p>
      ) : (
        <CustomTable
          data={course}
          columns={[
            { key: "id", label: "Course Id" },
            { key: "title", label: " title" },
            { key: "price", label: " price" },
            { key: "subject", label: " subject" },
            { key: "total_lessons", label: "total_lessons" },
            { key: "tutor_id", label: "tutor id" },
            { key: "full_name", label: "Tutor name" },
            { key: "phone", label: "tutor phone" },
        ]}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManagementCourses;
