"use client";

import CustomInput from "@/components/nondashboard/CustomInput";
import CustomTable from "@/components/nondashboard/CustomTable";
import {
  useGetCoursesQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} from "@/state/api";
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
  const { data: courseFilter, isLoading, refetch } = useGetCoursesQuery({});
  const [updateCourse] = useUpdateCourseMutation();
  const [deleteCourse] = useDeleteCourseMutation();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<
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
      const transformedCourses = (courseFilter as Course[]).map((cor) => ({
        id: cor.id,
        title: cor.title ?? "",
        price: cor.price ?? 0,
        subject: cor.subject ?? "",
        total_lessons: cor.total_lessons ?? 0,
        tutor_id: cor.tutor_id ?? 0,
        full_name: cor.tutor?.profile?.full_name ?? "Unknown",
        phone: cor.tutor?.profile?.phone ?? "N/A",
      }));
      setCourses(transformedCourses);
    }
  }, [courseFilter]);

  const handleDelete = async (id: number) => {
    try {
      await deleteCourse(id).unwrap();
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Failed to delete course:", error);
    }
  };

  const handleUpdate = (id: number) => {
    const courseToUpdate = courses.find((course) => course.id === id);
    if (courseToUpdate) {
      setSelectedCourse(courseToUpdate);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async (data: Record<string, string | boolean>) => {
    try {
      if (isUpdate) {
        const formData = new FormData();
        formData.append("title", String(data.title));
        formData.append("price", String(data.price));
        formData.append("subject", String(data.subject));
        formData.append("total_lessons", String(data.total_lessons));

        await updateCourse({
          courseId: selectedCourse?.id || 0,
          formData,
        }).unwrap();
        setIsUpdate(false);
        setSelectedCourse(null);
      } else {
        setIsCreate(false);
        console.log(data);
      }
      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <div className="p-6 bg-gray-100  min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl text-black font-bold mb-2">
          Courses Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your courses, update details, and remove inactive courses.
        </p>

        {(isUpdate && selectedCourse) || isCreate ? (
          <div className="mb-6 bg-gray-50 shadow-md p-5 rounded-lg">
            <CustomInput
              fields={[
                { name: "title", type: "text" },
                { name: "price", type: "text" },
                { name: "subject", type: "text" },
                { name: "total_lessons", type: "text" },
              ]}
              title={`${
                isUpdate
                  ? `Please Input New Data: ${
                      selectedCourse?.title || "unknow"
                    }`
                  : "Please Input Course Data"
              }`}
              typeSubmit={isUpdate ? "Update" : "Create"}
              onSubmit={handleSubmit}
              defaultValues={
                isUpdate
                  ? {
                      title: selectedCourse?.title,
                      price: selectedCourse?.price?.toString(),
                      subject: selectedCourse?.subject,
                      total_lessons: selectedCourse?.total_lessons?.toString(),
                    }
                  : {}
              }
            />
            <button
              onClick={() =>
                isUpdate ? setIsUpdate(false) : setIsCreate(false)
              }
              className="mt-3 text-red-500 font-semibold underline"
            >
              Cancel
            </button>
          </div>
        ) : isLoading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="bg-white-100 shadow-md rounded-lg overflow-hidden">
            <CustomTable
              data={courses}
              columns={[
                { key: "id", label: "Course ID" },
                { key: "title", label: "Title" },
                { key: "price", label: "Price" },
                { key: "subject", label: "Subject" },
                { key: "total_lessons", label: "Total Lessons" },
                { key: "full_name", label: "Tutor Name" },
                { key: "phone", label: "Tutor Phone" },
              ]}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onCreate={handleCreate}
              ITEMS_PER_PAGE={6}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementCourses;
