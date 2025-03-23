"use client";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Dialog } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { useGetSessionQuery } from "@/state/api";
import { TeachingSession } from "@/types";
import React, { useEffect, useState } from "react";
import { SessionDetailDialog } from "./SessionDetailDialog";

const SchedulePage = () => {
  const { user, loading } = useUser();
  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const {
    data: teachingSessions,
    isLoading,
    isError,
    refetch,
  } = useGetSessionQuery({ userId: Number(user?.ID) || 0 }, { skip: !user });

  useEffect(() => {
    setEventDialogOpen(selectedEvent !== null);
  }, [selectedEvent]);

  if (loading || isLoading) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;
  if (isError) return <div>Error loading courses.</div>;

  return (
    <div className="w-full h-full">
      <Header title="Schedule" subtitle="View your schedule" />
      <div className="h-">
        <BigCalendarContainer
          teachingSessions={teachingSessions}
          onSelectEvent={setSelectedEvent}
        />
      </div>
      {selectedEvent && (
        <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
          <SessionDetailDialog
            session={selectedEvent}
            refetch={refetch}
            isTutor={true}
          />
        </Dialog>
      )}
    </div>
  );
};

export default SchedulePage;
