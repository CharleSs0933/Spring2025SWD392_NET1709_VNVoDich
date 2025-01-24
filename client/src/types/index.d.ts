export interface Course {
  id: number;
  tutor_id: number;
  title: string;
  description?: string;
  total_lessons: number;
  image?: string;
  price: number;
  status: "Draft" | "Published";
  subject: string;
  grade: number;

  tutor?: Tutor;
  // availabilitys?: Availability[];
  // lessons?: Lesson[];
  // courseSubscriptions?: CourseSubscription[];
  // courseReviews?: CourseReview[];
}

export interface Tutor {
  id: number;
  bio: string;
  qualifications: string;
  teaching_style: string;
  is_available: boolean;
  demo_video_url?: string;
  image?: string;

  // tutorSpecialty?: TutorSpecialty[];
  // courses?: Course[];
  // tutorReviews?: TutorReview[];
}

export interface SearchCourseCardProps {
  course: Course;
  isSelected?: boolean;
  onClick?: () => void;
}
