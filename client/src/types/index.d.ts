import { string } from "zod";

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
  courseReviews?: CoursesReview[];
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
  username?: string;
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

  profile?: {
    email: string;
    full_name: string;
    phone: string;
    google_id: string;
    timezone: string;
  };
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
  onGradeChange: (grade: string) => void;
}

export interface CourseFormData {
  courseTitle: string;
  courseDescription: string;
  courseSubject: string;
  courseGrade: string;
  coursePrice: string;
  courseStatus: boolean;
}

export interface CustomFixedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
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

export interface ChildrenDropTable {
  child: Children;
  onEdit: (child: Children) => void;
  onDelete: (child: Children) => void;
}

export interface DayAvailability {
  isAvailable: boolean;
  startTime: string | null; // Format: "HH:mm"
  endTime: string | null; // Format: "HH:mm"
}

export interface Availability {
  timeGap: number;
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}

export interface TeachingSession {
  id: number;
  google_meet_id: string;
  startTime: string;
  endTime: string;
  status: string;
  topics_covered: string;
  homework_assigned: string;
  subscription_id: number;
  subscription?: {
    course?: Course;
  };
}

export interface TutorReview {
  id: number;
  rating: number;
  review_content: string;
  // createAt: dateTime

  tutor_id: number;
  tutor: Tutor;
  parent_id: number;
  parent: Parent;
}

export interface CourseReview {
  id: number;
  rating: number;
  review_content: string;
  // createAt   :    DateTime

  course_id: number;
  course: Course;
  parent_id: number;
  parent: Parent;
}

export interface Parent {
  id: number;
  preferred_language: string;
  notifications_enable: boolean;

  profile?: {
    email: string;
    full_name: string;
    phone: string;
    username: string;
  };
  childrens?: Children[];
  tutorReviews?: TutorReview[];
  courseReviews?: CourseReview[];
}
