import { Course } from "@/types";

interface searchProp {
  courses: Course[] | undefined;
  tagSelect: string;
  searchTerm: string;
}

const searchCourses = ({ courses, tagSelect, searchTerm }: searchProp): Course[] => {
  if (!courses) return [];

  let filtered = courses;

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

  return filtered;
};

export default searchCourses;
