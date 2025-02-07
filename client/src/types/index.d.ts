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
  lessons?: Lesson[];
  // courseSubscriptions?: CourseSubscription[];
  // courseReviews?: CourseReview[];
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  learning_objectives?: string;
  materials_needed?: string;
}

export interface User {
  id?: number;
  email?: string;
  full_name?: string;
  phone?: string;
  role?: "Tutor" | "Parent" | "Kid";
  google_id?: string;
  timezone?: string;
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
export interface Children {
  id: number;
  age: number;
  grade_level: string;
  learning_goals: string;
  full_name: string;
  password: string;
  parent_id: number;
}
export interface SearchCourseCardProps {
  course: Course;
  isSelected?: boolean;
  onClick?: () => void;
}

export interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number; // Percentage of element visibility to trigger animation
  animationDuration?: number; // Duration of animation
  initialStyle?: Record<string, any>; // Initial style of the animation
  animateStyle?: Record<string, any>; // Style to animate to
}

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export interface HeaderProps {
  title: string;
  subtitle: string;
  rightElement?: ReactNode;
}

export interface TeacherCourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
  isOwner: boolean;
}

export interface ToolbarProps {
  onSearch: (search: string) => void;
  onSubjectChange: (subject: string) => void;
}

export interface CourseFormData {
  courseTitle: string;
  courseDescription: string;
  courseSubject: string;
  coursePrice: string;
  courseStatus: boolean;
}

export interface CustomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
