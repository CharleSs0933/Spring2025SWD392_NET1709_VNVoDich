import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TeachingSession } from "@/types";

export const SessionDetailDialog = ({
  course,
}: {
  course: TeachingSession;
}) => {
  return (
    <DialogContent className=" max-w-screen-sm bg-[#3C415C] text-white">
      <DialogTitle className="text-lg font-semibold text-primary-100">
        Course Details
      </DialogTitle>

      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <strong className="col-span-1 text-sm font-medium">Subject:</strong>
          <span className="col-span-3 text-base">
            {course.subscription?.course?.title || "No Title"}
          </span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <strong className="col-span-1 text-sm font-medium">Time:</strong>
          <span className="col-span-3 text-base">
            {course.startTime.slice(11, 16)} - {course.endTime.slice(11, 16)} /{" "}
            {course.endTime.split("T")[0]}
          </span>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <strong className="col-span-1 text-sm font-medium">
            Description:
          </strong>
          <span className="col-span-3 text-base">
            {course.subscription?.course?.description || "No Description"}
          </span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <strong className="col-span-1 text-sm font-medium">Tutor:</strong>
          <span className="col-span-3 text-base">
            {course.subscription?.course?.tutor?.profile?.full_name ||
              "Unknown"}
          </span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <strong className="col-span-1 text-sm font-medium">
            Google Meet:
          </strong>
          <span className="col-span-3 text-base">
            <a
              href={course.google_meet_id}
              target="_blank"
              className="text-blue-500 underline hover:text-blue-300"
            >
              Join
            </a>
          </span>
        </div>
      </div>
    </DialogContent>
  );
};
