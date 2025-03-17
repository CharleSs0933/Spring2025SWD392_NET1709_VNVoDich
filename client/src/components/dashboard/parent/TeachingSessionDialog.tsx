import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TeachingSession } from "@/types";
import { Book, Calendar, Clock, Edit, User, Video } from "lucide-react";
import { useGetCourseAvailabilityQuery } from "@/state/api";
import Loading from "@/components/Loading";
import RescheduleForm from "./RescheduleForm";
import { useState } from "react";

export const SessionDetailDialog = ({
  session,
  refetch,
}: {
  session: TeachingSession;
  refetch: () => void;
}) => {
  const [showReschedule, setShowReschedule] = useState<boolean>(false);
  const { data: availabilites, isLoading: isAvailabilityLoading } =
    useGetCourseAvailabilityQuery(
      {
        courseId: session.subscription?.course?.id.toString() || "",
        type: "Day",
      },
      { skip: !session.subscription?.course?.id }
    );

  if (isAvailabilityLoading) return <Loading />;

  return (
    // <DialogContent className="max-w-5xl bg-[#3C415C] text-white">
    //   <DialogTitle />

    //   <div className="w-full h-fit flex gap-5">
    //     <div className="grid gap-4 ">
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <strong className="col-span-1 text-sm font-medium">Subject:</strong>
    //         <span className="col-span-3 text-base">
    //           {session.subscription?.course?.title || "No Title"}
    //         </span>
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <strong className="col-span-1 text-sm font-medium">Tutor:</strong>
    //         <span className="col-span-3 text-base">
    //           {session.subscription?.course?.tutor?.profile?.full_name ||
    //             "Unknown"}
    //         </span>
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <strong className="col-span-1 text-sm font-medium">Topic:</strong>
    //         <span className="col-span-3 text-base">
    //           {session.topics_covered || "No Topic"}
    //         </span>
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <strong className="col-span-1 text-sm font-medium">Time:</strong>
    //         <span className="col-span-3 text-base">
    //           {session.startTime.slice(11, 16)} -{" "}
    //           {session.endTime.slice(11, 16)} / {session.endTime.split("T")[0]}
    //         </span>
    //       </div>

    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <strong className="col-span-1 text-sm font-medium">
    //           Google Meet:
    //         </strong>
    //         <span className="col-span-3 text-base">
    //           <a
    //             href={session.google_meet_id}
    //             target="_blank"
    //             className="text-blue-500 underline hover:text-blue-300"
    //           >
    //             Join
    //           </a>
    //         </span>
    //       </div>
    //     </div>
    //     <BookingForm availabilities={availabilites || []} />
    //   </div>
    // </DialogContent>

    <DialogContent
      className={`p-0 overflow-hidden rounded-lg ${
        showReschedule ? "max-w-6xl" : ""
      }`}
    >
      <DialogTitle className="sr-only">Details</DialogTitle>
      <div className="flex flex-col md:flex-row">
        {/* Left Panel - Session Details */}
        <div
          className={`w-full ${
            showReschedule ? "md:w-2/5" : "md:w-full"
          }  bg-[#3f3f9d] text-white p-6 `}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-indigo-400 pb-3">
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
                {setShowReschedule && (
                  <button
                    onClick={() => setShowReschedule(!showReschedule)}
                    className="ml-2 p-1 hover:bg-indigo-600 rounded-full transition-colors"
                    title="Reschedule"
                  >
                    <Edit className="w-4 h-4 text-indigo-200 hover:text-white" />
                  </button>
                )}
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

        {/* Right Panel - Booking Form */}
        {availabilites && showReschedule ? (
          <RescheduleForm
            availabilities={availabilites || []}
            sessionId={session.id}
            refetch={refetch}
            setShowReschedule={setShowReschedule}
          />
        ) : null}
      </div>
    </DialogContent>
  );
};
