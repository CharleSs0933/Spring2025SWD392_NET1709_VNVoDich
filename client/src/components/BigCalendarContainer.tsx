import BigCalendar from "@/components/BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";
import { addHours, parseISO } from "date-fns";

const BigCalendarContainer = ({ id }: { id: number }) => {
  const {
    data: teachingSession,
    isLoading,
    isError,
  } = useGetSessionQuery({
    childrenId: id,
  });

  if (isLoading) return <Loading />;
  if (isError || !teachingSession) return <div>Error loading courses.</div>;

  const dataTeaching = teachingSession.map((event) => ({
    title: event.subscription?.course?.title || " ",
    start: addHours(parseISO(event.startTime), -7),
    end: addHours(parseISO(event.endTime), -7),
  }));

  const schedule = adjustScheduleToCurrentWeek(dataTeaching);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
