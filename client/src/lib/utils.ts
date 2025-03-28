import { CourseFormData } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TutorFormData } from "./schemas";
import { ParentFormData } from "./schemas";
import { Check, LucideIcon, Trophy, X } from "lucide-react";

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

export const sessionStatus = [
  { value: "NotYet", label: "Not Yet" },
  { value: "Attended", label: "Attended" },
  { value: "Absent", label: "Absent" },
];

export const teachingQualities = [
  { value: "POOR", label: "Poor" },
  { value: "FAIR", label: "Fair" },
  { value: "GOOD", label: "Good" },
  { value: "EXCELLENT", label: "Excellent" },
];

export const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const createCourseFormData = (data: CourseFormData): FormData => {
  const formData = new FormData();

  formData.append("title", data.courseTitle);
  formData.append("description", data.courseDescription);
  formData.append("subject", data.courseSubject);
  formData.append("grade", data.courseGrade.toString());
  formData.append("price", data.coursePrice.toString());
  formData.append("status", data.courseStatus ? "Published" : "Draft");
  formData.append("image", data.courseImage);

  return formData;
};

export const createTutorFormData = (data: TutorFormData): FormData => {
  const formData = new FormData();

  formData.append("username", data.userName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("full_name", data.fullName);
  formData.append("bio", data.bio);
  formData.append("qualifications", data.qualifications);
  formData.append("teaching_style", data.teaching_style);
  formData.append("demo_video_url", data.demo_video_url);

  return formData;
};

export const createParentFormData = (data: ParentFormData): FormData => {
  const formData = new FormData();

  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("full_name", data.full_name);
  return formData;
};

// IT APPEARS THAT BIG CALENDAR SHOWS THE LAST WEEK WHEN THE CURRENT DAY IS A WEEKEND.
// FOR THIS REASON WE'LL GET THE LAST WEEK AS THE REFERENCE WEEK.
// IN THE TUTORIAL WE'RE TAKING THE NEXT WEEK AS THE REFERENCE WEEK.

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  lessons: { title: string; start: Date; end: Date; id: number }[]
): { title: string; start: Date; end: Date; id: number }[] => {
  const latestMonday = getLatestMonday();

  return lessons.map((lesson) => {
    const lessonDayOfWeek = lesson.start.getDay();

    const daysFromMonday = lessonDayOfWeek === 0 ? 6 : lessonDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      lesson.start.getHours(),
      lesson.start.getMinutes(),
      lesson.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      lesson.end.getHours(),
      lesson.end.getMinutes(),
      lesson.end.getSeconds()
    );

    return {
      title: lesson.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
      id: lesson.id,
    };
  });
};

export const calculateAge = (dateOfBirth: string) => {
  const birthDate = new Date(dateOfBirth.split("T")[0]); // Lấy phần YYYY-MM-DD
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // Điều chỉnh tuổi nếu sinh nhật chưa tới trong năm hiện tại
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

export const getStatusStyles = (
  status: string
): { className: string; icon: LucideIcon } => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        className:
          "bg-green-500 text-white-50 px-2 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-1",
        icon: Check,
      };
    case "completed":
      return {
        className:
          "bg-blue-500 text-white-50 px-2 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-1",
        icon: Trophy,
      };
    case "rejected":
      return {
        className:
          "bg-red-600 text-white-50 px-2 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-1",
        icon: X,
      };
    case "approved":
      return {
        className:
          "bg-blue-600 text-white-50 px-2 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-1",
        icon: Check,
      };
    case "pending":
      return {
        className:
          "bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-medium flex items-center justify-center gap-1",
        icon: Trophy,
      };
    default:
      return {
        className:
          "bg-gray-500 text-white-50 px-2 py-1 rounded-full text-sm font-medium flex justify-center items-center gap-1",
        icon: Check,
      };
  }
};
