import { CourseFormData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number | undefined): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents || 0);
}

export const courseSubjects = [
  { value: "Mathematics", label: "Mathematics" },
  { value: "English", label: "English" },
  { value: "Science", label: "Science" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Art", label: "Art" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Music", label: "Music" },
];

export const courseGrades = [
  { value: "1", label: "Grade 1" },
  { value: "2", label: "Grade 2" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
  { value: "6", label: "Grade 6" },
  { value: "7", label: "Grade 7" },
  { value: "8", label: "Grade 8" },
  { value: "9", label: "Grade 9" },
  { value: "10", label: "Grade 10" },
  { value: "11", label: "Grade 11" },
  { value: "12", label: "Grade 12" },
];

export const createCourseFormData = (data: CourseFormData): FormData => {
  const formData = new FormData();

  formData.append("title", data.courseTitle);
  formData.append("description", data.courseDescription);
  formData.append("subject", data.courseSubject);
  formData.append("grade", data.courseGrade.toString());
  formData.append("price", data.coursePrice.toString());
  formData.append("status", data.courseStatus ? "Published" : "Draft");

  return formData;
};
