"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../app/(dashboard)/parent/children/[id]/dataTam";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { useGetSessionQuery } from "@/state/api";
import Loading from "./Loading";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";
import { setDate } from "date-fns";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
  onSelectEvent,
}: {
  data: { title: string; start: Date; end: Date; id: number }[];
  onSelectEvent: (event: any) => void;
}) => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [date, setDate] = useState<Date>(new Date());

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  console.log("event", data);

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["week", "day"]}
      view={view}
      style={{ height: 650 }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 1, 6, 0, 0)}
      max={new Date(2025, 1, 2, 22, 0, 0)}
      onSelectEvent={(event) => onSelectEvent(event)}
      onNavigate={handleNavigate}
    />
  );
};

export default BigCalendar;
