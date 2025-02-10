import * as z from "zod";

// Course Editor Schemas
export const courseSchema = z.object({
  courseTitle: z.string().min(1, "Title is required"),
  courseDescription: z.string().min(1, "Description is required"),
  courseSubject: z.string().min(1, "Subject is required"),
  courseGrade: z.string().min(1, "Grade is required"),
  coursePrice: z.string(),
  courseStatus: z.boolean(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Lesson Schemas
export const lessonSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  learning_objectives: z.string(),
  materials_needed: z.string(),
});

export type LessonFormData = z.infer<typeof lessonSchema>;
