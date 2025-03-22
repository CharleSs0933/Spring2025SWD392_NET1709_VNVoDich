"use client";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { SessionDetailDialog } from "@/components/dashboard/parent/TeachingSessionDialog";
import Loading from "@/components/Loading";
import { Dialog } from "@/components/ui/dialog";
import { useUser } from "@/hooks/useUser";
import { useGetChildQuery } from "@/state/api";
import { TeachingSession } from "@/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = useUser();
  const {
    data: child,
    isLoading,
    isError,
  } = useGetChildQuery({ id: user?.ID });
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );

  useEffect(() => {
    setEventDialogOpen(selectedEvent !== null);
  }, [selectedEvent]);

  if (isLoading) return <Loading />;
  if (isError || !child) return <div>Error loading child.</div>;
  return (
    <div>
      <div className="flex items-center gap-40">
        {selectedEvent && (
          <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
            <SessionDetailDialog course={selectedEvent} />
          </Dialog>
        )}
      </div>
      <div className="mt-4 bg-white rounded-md p-4">
        <h1>Teacher&apos;s Schedule</h1>
        <BigCalendarContainer id={child.id} onSelectEvent={setSelectedEvent} />
      </div>
    </div>
  );
};

export default page;
