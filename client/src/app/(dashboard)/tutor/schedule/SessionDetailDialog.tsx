"use client";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TeachingSession } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Book, Calendar, Clock, User, Video } from "lucide-react";
import SessionFeedbackForm from "./SessionFeedbackForm";

// Schema validation bằng Zod
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().optional(),
  teachingQuality: z
    .string()
    .optional()
    .refine(
      (val) => !val || ["Poor", "Fair", "Good", "Excellent"].includes(val),
      {
        message: "Invalid teaching quality value",
      }
    ),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

type SessionDetailDialogProps = {
  session: TeachingSession;
  refetch: () => void;
};

export const SessionDetailDialog = ({
  session,
  refetch,
}: SessionDetailDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Khởi tạo form với react-hook-form và zod
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      teachingQuality: "",
    },
  });

  // Mutation để gửi feedback
  //   const submitFeedback = useMutation({
  //     mutationFn: async (data: FeedbackFormValues) => {
  //       const response = await fetchWithAuth(`/api/session-feedback`, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           session_id: session.id,
  //           rating: data.rating,
  //           comment: data.comment || null,
  //           teaching_quality: data.teachingQuality || null,
  //         }),
  //       });
  //       return response.json();
  //     },
  //     onSuccess: () => {
  //       refetch(); // Làm mới dữ liệu sau khi gửi feedback thành công
  //       form.reset();
  //     },
  //     onError: (error) => {
  //       console.error("Error submitting feedback:", error);
  //     },
  //     onSettled: () => {
  //       setIsSubmitting(false);
  //     },
  //   });

  //   const onSubmit = (data: FeedbackFormValues) => {
  //     setIsSubmitting(true);
  //     submitFeedback.mutate(data);
  //   };

  return (
    <DialogContent className="max-w-5xl bg-customgreys-primarybg">
      <DialogHeader>
        <DialogTitle>Session Feedback</DialogTitle>
        <DialogDescription>
          Provide feedback for the session:{" "}
          {session.subscription?.course?.title || "Untitled"}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col md:flex-row">
        {/* Left Panel - Session Details */}
        <div
          className={`w-full md:w-2/5 text-white p-6 border bg-customgreys-secondarybg`}
        >
          <h2 className="text-2xl font-bold mb-6 border-b  pb-3">
            Session Details
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Book className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-indigo-200 text-sm">Subject</p>
                <p className="font-semibold text-lg">
                  {session.subscription?.course?.title || "Basic Mathematics"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-indigo-200 text-sm">Tutor</p>
                <p className="font-semibold text-lg">
                  {session.subscription?.course?.tutor?.profile?.full_name ||
                    "John Doe"}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <div className="flex items-start">
                <div>
                  <p className="text-indigo-200 text-sm">Date & Time</p>
                  <p className="font-semibold">
                    {new Date(session.startTime).toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-indigo-200">
                    {session.startTime.slice(11, 16)} -{" "}
                    {session.endTime.slice(11, 16)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-indigo-200 text-sm">Topic</p>
                <p className="font-semibold">
                  {session.topics_covered || "Multiplication and Division"}
                </p>
              </div>
            </div>

            <div className="flex items-start mt-8">
              <Video className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
              <div>
                <p className="text-indigo-200 text-sm">Meeting Link</p>
                <a
                  href={session.google_meet_id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 bg-indigo-500 hover:bg-indigo-400 text-white py-2 px-4 rounded-md transition-colors font-medium"
                >
                  Join Google Meet
                </a>
              </div>
            </div>
          </div>
        </div>
        <SessionFeedbackForm session={session} />
      </div>
    </DialogContent>
  );
};
