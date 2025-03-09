"use client";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { SessionDetailDialog } from "@/components/dashboard/parent/TeachingSessionDialog";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Dialog } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { TeachingSession } from "@/types";
import React, { useEffect, useState } from "react";

const SchedulePage = () => {
  const { user, loading } = useUser();
  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  useEffect(() => {
    setEventDialogOpen(selectedEvent !== null);
  }, [selectedEvent]);

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
      {selectedEvent && (
        <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
          <SessionDetailDialog session={selectedEvent} />
        </Dialog>
      )}
    </div>
  );
};

export default SchedulePage;
