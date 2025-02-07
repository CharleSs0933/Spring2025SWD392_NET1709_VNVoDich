import { useGetCoursesQuery, useGetTutorsQuery } from "@/lib/features/api/api";
import { Course, Tutor } from "@/types";
import React, { useEffect, useState } from "react";

interface searchProp {
  courses: Course[] | undefined;
  tagSelect: string;
  searchTerm: string;
}
const searchCourses = ({ courses, tagSelect, searchTerm }: searchProp) => {
  const [coursesFilter, setCoursesFilter] = useState<Course[]>([]);

  useEffect(() => {
    let filtered = courses ?? [];

    if (tagSelect) {
      filtered = filtered.filter((c) => c.subject === tagSelect);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.grade.toString().includes(searchTerm.toLowerCase()) ||
          c.price.toString().includes(searchTerm)
      );
     
    }

    setCoursesFilter(filtered);
  }, [tagSelect, searchTerm, courses]);

  return coursesFilter;
};

export default searchCourses;
