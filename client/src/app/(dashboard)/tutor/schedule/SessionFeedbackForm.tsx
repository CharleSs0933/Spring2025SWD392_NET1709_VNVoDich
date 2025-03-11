import { CustomFormField } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FeedbackFormData, feedbackSchema } from "@/lib/schemas";
import { sessionStatus, teachingQualities } from "@/lib/utils";
import { useUpdateSessionMutation } from "@/state/api";
import { TeachingSession } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const SessionFeedbackForm = ({
  session,
  refetch,
}: {
  session: TeachingSession;
  refetch: () => void;
}) => {
  const methods = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      comment: "",
      rating: 0,
      teachingQuality: "",
      homeworkAssigned: "",
      status: "NotYet",
    },
  });

  const [updateSession] = useUpdateSessionMutation();

  useEffect(() => {
    if (session) {
      methods.reset({
        rating: session.rating,
        comment: session.comment,
        teachingQuality: session.teaching_quality,
        homeworkAssigned: session.homework_assigned,
        status: session.status,
      });
    }
  }, [session, methods]);

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      console.log(data);

      await updateSession({
        id: session.id,
        rating: data.rating,
        comment: data.comment,
        homework_assigned: data.homeworkAssigned,
        teaching_quality: data.teachingQuality,
        status: data.status,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update session feedback: ", error);
    }
  };

  return (
    <div className="w-full md:w-3/5 p-6 border">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-6 border-b pb-3">
            Session Feedback
          </h2>
          <div className="flex justify-between md:flex-row flex-col  mt-5 font-ds-sans">
            <div className="space-y-4 w-full">
              <CustomFormField
                name="rating"
                label="Rating"
                type="number"
                className="border-none w-full"
              />
              <CustomFormField
                name="teachingQuality"
                label="Teaching Quality"
                type="select"
                options={teachingQualities}
                initialValue={session.teaching_quality}
                className="border-none"
              />
              <CustomFormField
                name="homeworkAssigned"
                label="Homework Assigned"
                type="text"
                placeholder="Write homework here"
                className="border-none"
              />
              <CustomFormField
                name="comment"
                label="Comment"
                type="text"
                placeholder="Write comment here"
                className="border-none"
              />
              <CustomFormField
                name="status"
                label="Status"
                type="select"
                options={sessionStatus}
                initialValue={session.status}
                className="border-none w-full"
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="bg-primary-700 hover:bg-primary-600 mt-2"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SessionFeedbackForm;
