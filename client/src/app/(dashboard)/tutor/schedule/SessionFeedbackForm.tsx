import { CustomFormField } from "@/components/CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
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
  isTutor,
}: {
  session: TeachingSession;
  refetch: () => void;
  isTutor: boolean;
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
        homeworkAssigned: session.homework_assigned || "",
        status: session.status,
      });
    }
  }, [session, methods]);

  const onSubmit = async (data: FeedbackFormData) => {
    try {
      await updateSession({
        id: session.id,
        rating: data.rating,
        comment: data.comment,
        homework_assigned: data.homeworkAssigned || "",
        teaching_quality: data.teachingQuality,
        status: data.status,
      }).unwrap();

      refetch();
    } catch (error) {
      console.log("Failed to update session feedback: ", error);
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
                disabled={!isTutor}
                className="border-none w-full"
              />
              <CustomFormField
                name="teachingQuality"
                label="Teaching Quality"
                type={isTutor ? "select" : "text"}
                options={teachingQualities}
                initialValue={session.teaching_quality}
                disabled={!isTutor}
                className="border-none"
              />
              {isTutor ? (
                <CustomFormField
                  name="homeworkAssigned"
                  label="Homework Assigned"
                  type="text"
                  placeholder="Write homework here"
                  className="border-none"
                />
              ) : (
                <>
                  <Label className={`text-customgreys-dirtyGrey text-sm`}>
                    <span>Homework Assigned</span>
                  </Label>
                  <a
                    href={session.homework_assigned}
                    target="_blank"
                    className="text-blue-500 hover:underline text-sm mt-2 block text-center"
                  >
                    Download PDF
                  </a>
                </>
              )}
              <CustomFormField
                name="comment"
                label="Comment"
                type="text"
                placeholder="Write comment here"
                disabled={!isTutor}
                className="border-none"
              />
              <CustomFormField
                name="status"
                label="Status"
                type={isTutor ? "select" : "text"}
                options={sessionStatus}
                initialValue={session.status}
                disabled={!isTutor}
                className="border-none w-full"
              />
            </div>
          </div>
          {/* Submit Button */}
          {isTutor && (
            <div className="w-full flex justify-end">
              <Button
                type="submit"
                className="bg-primary-700 hover:bg-primary-600 mt-2"
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default SessionFeedbackForm;
