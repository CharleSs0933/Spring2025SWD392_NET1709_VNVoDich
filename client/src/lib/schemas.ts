import { notFound } from "next/navigation";
import * as z from "zod";

// Course Editor Schemas
export const courseSchema = z.object({
  courseTitle: z.string().min(1, "Title is required"),
  courseDescription: z.string().min(1, "Description is required"),
  courseSubject: z.string().min(1, "Subject is required"),
  courseGrade: z.string().min(1, "Grade is required"),
  coursePrice: z.string(),
  courseStatus: z.boolean(),
  courseImage: z.string(),
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
