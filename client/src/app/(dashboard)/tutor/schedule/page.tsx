"use client";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUser";
import { TeachingSession } from "@/types";
import React, { useState } from "react";

const SchedulePage = () => {
  const { user, loading } = useUser();
  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );

  if (loading) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;
  // if (isError ) return <div>Error loading courses.</div>;
  return (
    <div className="w-full h-full">
      <Header title="Schedule" subtitle="View your schedule" />
      <div className="h-">
        <BigCalendarContainer
          id={Number(user.ID)}
          onSelectEvent={setSelectedEvent}
        />
      </div>
    </div>
  );
};

export default SchedulePage;
