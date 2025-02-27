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

const BigCalendar = ({
  data,
  selectedEvent,
}: {
  data: { title: string; start: Date; end: Date }[];
  selectedEvent: (event: any) => void;
}) => {
  const [view, setView] = useState<View>(Views.WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

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
      onSelectEvent={(event) => selectedEvent(event)}
    />
  );
};

export default BigCalendar;
