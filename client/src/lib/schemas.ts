import * as z from "zod";

// Course Editor Schemas
export const courseSchema = z.object({
  courseTitle: z.string().min(1, "Title is required"),
  courseDescription: z.string().min(1, "Description is required"),
  courseSubject: z.string().min(1, "Subject is required"),
  courseGrade: z.string().min(1, "Grade is required"),
  coursePrice: z.coerce.number().min(0, "Price must be 0 or more"),
  courseStatus: z.boolean(),
  courseImage: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Lesson Schemas
export const lessonSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  learning_objectives: z.string(),
  materials_needed: z.string(),
  homework: z.string(),
});

export type LessonFormData = z.infer<typeof lessonSchema>;

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        if (!data.startTime || !data.endTime) return false;
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End time must be more than start time",
      path: ["endTime"],
    }
  );

export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "Time gap must be 0 or more minutes").int(),
});

export const bookingSchema = z.object({
  dates: z.array(z.string()),
  times: z.array(z.string()),
  childId: z.string().min(1, "Please select a child"),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const tutorSchema = z.object({
  userName: z.string(),
  fullName: z
    .string()
    .min(5, "Full Name must be at least 10 characters")
    .min(1, "Full Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Grade is required"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  qualifications: z
    .string()
    .min(10, "Qualifications must be at least 10 characters"),
  teaching_style: z
    .string()
    .min(10, "Teaching style must be at least 10 characters"),
  demo_video_url: z.string(),
});

export type TutorFormData = z.infer<typeof tutorSchema>;

// Detail Profile Editor Schemas
export const parentSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  full_name: z.string().min(5, "Full Name must be at least 5 characters"),
  date_of_birth: z
    .string()
    .refine((date) => {
      const d = new Date(date);
      return !isNaN(d.getTime());
    }, "Invalid date format")
    .refine((date) => {
      const d = new Date(date);
      const today = new Date();
      return d <= today;
    }, "Date of birth cannot be in the future")
    .refine((date) => {
      const d = new Date(date);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      return d >= minDate;
    }, "Date of birth is too far in the past"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number must have 10 digits"),
});

export type ParentFormData = z.infer<typeof parentSchema>;

export const feedbackSchema = z.object({
  rating: z.coerce.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().optional(),
  teachingQuality: z.string().optional(),
  status: z.string().optional(),
  homeworkAssigned: z.string().optional(),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
