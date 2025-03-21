import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TeachingSession } from "@/types";
import { useGetCourseAvailabilityQuery } from "@/state/api";
import Loading from "@/components/Loading";
import RescheduleForm from "./RescheduleForm";

export const RescheduleSessionDialog = ({
  session,
  refetch,
}: {
  session: TeachingSession;
  refetch: () => void;
}) => {
  const { data: availabilites, isLoading: isAvailabilityLoading } =
    useGetCourseAvailabilityQuery(
      {
        courseId: session.subscription?.course_id.toString() || "",
        type: "Day",
      },
      { skip: !session.subscription?.course_id }
    );

  if (isAvailabilityLoading) return <Loading />;

  return (
    <DialogContent
      className={`p-0 overflow-hidden rounded-lg max-w-3xl
      `}
    >
      <DialogTitle className="sr-only">Reschedule Session</DialogTitle>
      {/* Right Panel - Booking Form */}
      {availabilites && (
        <RescheduleForm
          availabilities={availabilites || []}
          sessionId={session.id}
          refetch={refetch}
        />
      )}
    </DialogContent>
  );
};
