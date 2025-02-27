import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";
import BigCalendar from "./BigCalendar";
import { addHours, parseISO } from "date-fns";

const BigCalendarContainer = ({
  id,
  selectedEvent,
}: {
  id: number;
  selectedEvent: (event: any) => void;
}) => {
  const {
    data: teachingSession,
    isLoading,
    isError,
  } = useGetSessionQuery({
    childrenId: id,
  });

  if (isLoading) return <Loading />;
  if (isError || !teachingSession) return <div>Error loading courses.</div>;

  const dataTeaching = teachingSession.map((event) => {
    const start = parseISO(event.startTime); // Parse chuỗi ISO thành Date, giữ UTC
    const end = parseISO(event.endTime);

    return {
      title: event.subscription?.course?.title || " ",
      start: addHours(start, -7),
      end: addHours(end, -7),
    };
  });

  const schedule = adjustScheduleToCurrentWeek(dataTeaching);
  console.log(schedule);

  return (
    <div className="">
      <BigCalendar data={schedule} selectedEvent={selectedEvent} />
    </div>
  );
};

export default BigCalendarContainer;
