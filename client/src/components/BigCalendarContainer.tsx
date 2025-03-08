// import { adjustScheduleToCurrentWeek } from "@/lib/utils";
// import { useGetSessionQuery } from "@/state/api";
// import Loading from "./Loading";
// import BigCalendar from "./BigCalendar";
// import { addHours, parseISO } from "date-fns";

// const BigCalendarContainer = ({
//   id,
//   selectedEvent,
// }: {
//   id: number;
//   selectedEvent: (event: any) => void;
// }) => {
//   const {
//     data: teachingSession,
//     isLoading,
//     isError,
//   } = useGetSessionQuery({
//     childrenId: id,
//   });

//   if (isLoading) return <Loading />;
//   if (isError || !teachingSession) return <div>Error loading courses.</div>;

//   const dataTeaching = teachingSession.map((event) => {
//     const start = parseISO(event.startTime); // Parse chuỗi ISO thành Date, giữ UTC
//     const end = parseISO(event.endTime);

//     return {
//       id: event.id,
//       title: event.subscription?.course?.title || " ",
//       start: addHours(start, -7),
//       end: addHours(end, -7),
//     };
//   });

//   const schedule = adjustScheduleToCurrentWeek(dataTeaching);
//   console.log("Schedule Data:", schedule);

//   return (
//     <div className="">
//       <BigCalendar data={schedule} selectedEvent={selectedEvent} />
//     </div>
//   );
// };

// export default BigCalendarContainer;
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";
import { parseISO, addHours } from "date-fns";
import BigCalendar from "./BigCalendar";

const BigCalendarContainer = ({
  id,
  onSelectEvent,
}: {
  id: number;
  onSelectEvent: (event: any) => void;
}) => {
  const {
    data: teachingSession,
    isLoading,
    isError,
  } = useGetSessionQuery(
    {
      userId: id,
    },
    { skip: !id }
  );

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading schedule.</div>;

  const formattedData = teachingSession
    ? teachingSession.map((event) => ({
        title: event.subscription?.course?.title || "No Title",
        start: addHours(parseISO(event.startTime), -7),
        end: addHours(parseISO(event.endTime), -7),
        ...event,
      }))
    : [];

  return <BigCalendar data={formattedData} onSelectEvent={onSelectEvent} />;
};

export default BigCalendarContainer;
