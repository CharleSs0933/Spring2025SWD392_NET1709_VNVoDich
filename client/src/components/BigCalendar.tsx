"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

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

  // Handle navigation (Back, Next, Today)
  const handleNavigate = (newDate: Date) => {
    setDate(newDate); // Update the date state
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
      date={date}
      onNavigate={handleNavigate}
      onSelectEvent={(event) => onSelectEvent(event)}
      onNavigate={handleNavigate}
    />
  );
};

export default BigCalendar;
