import BigCalendar from "@/app/component/BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";

const BigCalendarContainer = async ({ id }: { id: number }) => {
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
    start: event.startTime as Date,
    end: event.endTime as Date,
  }));

  const schedule = adjustScheduleToCurrentWeek(dataTeaching);

  return <div className="">{/* <BigCalendar data={schedule} /> */}</div>;
};

export default BigCalendarContainer;
