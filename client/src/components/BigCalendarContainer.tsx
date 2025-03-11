import { parseISO, addHours } from "date-fns";
import BigCalendar from "./BigCalendar";
import { TeachingSession } from "@/types";

const BigCalendarContainer = ({
  teachingSessions,
  onSelectEvent,
}: {
  teachingSessions?: TeachingSession[];
  onSelectEvent: (event: any) => void;
}) => {
  const formattedData = teachingSessions
    ? teachingSessions.map((event) => ({
        title: event.subscription?.course?.title || "No Title",
        start: addHours(parseISO(event.startTime), -7),
        end: addHours(parseISO(event.endTime), -7),
        ...event,
      }))
    : [];

  return <BigCalendar data={formattedData} onSelectEvent={onSelectEvent} />;
};

export default BigCalendarContainer;
