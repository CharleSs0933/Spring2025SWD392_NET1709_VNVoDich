"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../app/(dashboard)/parent/children/[id]/dataTam";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ id }: { id: number }) => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const {
    data: teachingSession,
    isLoading,
    isError,
  } = useGetSessionQuery({
    childrenId: id,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading courses.</div>;

  const dataTeaching = teachingSession.map((event: any) => ({
    title: event.subscription.course.title,
    start: event.startTime,
    end: event.endTime,
  }));

  // const schedule = adjustScheduleToCurrentWeek(dataTeaching);
  console.log(dataTeaching);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleSelectEvent = (event: any) => {
    alert(
      `${event.id}/Môn học: ${event.title}\nThời gian: ${moment(
        event.start
      ).format("HH:mm")} - ${moment(event.end).format("HH:mm")}`
    );
    setSelectedEvent(event);
  };

  return (
    <Calendar
      localizer={localizer}
      events={dataTeaching}
      startAccessor="start"
      endAccessor="end"
      views={["week", "day"]}
      view={view}
      style={{ height: 650 }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 1, 6, 0, 0)}
      max={new Date(2025, 1, 2, 22, 0, 0)}
      onSelectEvent={handleSelectEvent}
    />
  );
};

export default BigCalendar;
