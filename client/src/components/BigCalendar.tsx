"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  data,
}: {
  data: { title: string; start: Date; end: Date }[];
}) => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

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
      events={data}
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
