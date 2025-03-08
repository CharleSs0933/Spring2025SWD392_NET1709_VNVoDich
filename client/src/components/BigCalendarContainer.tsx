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
  } = useGetSessionQuery({
    childrenId: id,
  });

  if (isLoading) return <Loading />;
  if (isError || !teachingSession) return <div>Error loading schedule.</div>;

  const formattedData = teachingSession.map((event) => ({
    title: event.subscription?.course?.title || "No Title",
    start: addHours(parseISO(event.startTime), -7),
    end: addHours(parseISO(event.endTime), -7),
    ...event,
  }));

  return <BigCalendar data={formattedData} onSelectEvent={onSelectEvent} />;
};

export default BigCalendarContainer;
