"use client";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import Loading from "@/components/Loading";
import { Dialog } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { useGetChildQuery, useGetSessionQuery } from "@/state/api";
import { TeachingSession } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SessionDetailDialog } from "../tutor/schedule/SessionDetailDialog";

const page = () => {
  const { user } = useUser();
  const {
    data: teachingSessions,
    isLoading,
    isError,
    refetch,
  } = useGetSessionQuery({
    userId: Number(user?.ID),
  });

  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  console.log(user);

  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );

  useEffect(() => {
    setEventDialogOpen(selectedEvent !== null);
  }, [selectedEvent]);

  if (isLoading) return <Loading />;
  if (isError || !teachingSessions) return <div>Error loading child.</div>;
  return (
    <div>
      <div className="flex items-center gap-40">
        {selectedEvent && (
          <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
            <SessionDetailDialog
              session={selectedEvent}
              refetch={() => refetch()}
              isTutor={false}
            />
          </Dialog>
        )}
      </div>
      <div className="mt-4 bg-white rounded-md p-4">
        <h1>Teacher&apos;s Schedule</h1>
        <BigCalendarContainer
          teachingSessions={teachingSessions}
          onSelectEvent={setSelectedEvent}
        />
      </div>
    </div>
  );
};

export default page;
