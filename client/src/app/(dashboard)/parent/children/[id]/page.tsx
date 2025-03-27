"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import {
  useGetChildQuery,
  useGetSessionQuery,
  useUpdateChildrenMutation,
} from "@/state/api";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChildDialog } from "@/components/dashboard/parent/ChildDialog";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { TeachingSession } from "@/types";
import { calculateAge } from "@/lib/utils";
import { SessionDetailDialog } from "@/app/(dashboard)/tutor/schedule/SessionDetailDialog";

const ChildSchedule = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // State hooks - define all state hooks at the top
  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    username: "",
    full_name: "",
    password: "",
    date_of_birth: "",
    learning_goals: "",
  });

  const {
    data: child,
    isLoading: isChildLoading,
    isError: isChildError,
  } = useGetChildQuery({ id });

  const {
    data: teachingSessions,
    isLoading: isTeachingSessionLoading,
    isError: isTeachingSessionError,
    refetch,
  } = useGetSessionQuery(
    {
      userId: Number(id),
    },
    { skip: !id }
  );

  const [updateChild] = useUpdateChildrenMutation();

  useEffect(() => {
    setEventDialogOpen(selectedEvent !== null);
  }, [selectedEvent]);

  const handleEdit = () => {
    if (child) {
      setFormData({
        username: child.profile?.username || "",
        full_name: child.profile?.full_name || "",
        password: "",
        date_of_birth: child.date_of_birth || "",
        learning_goals: child.learning_goals || "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateChild({
        id: id,
        full_name: formData.full_name,
        password: formData.password,
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
        learning_goals: formData.learning_goals,
      }).unwrap();

      setOpen(false);
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEventDialogOpen(false);
    setSelectedEvent(null);
  };

  if (isChildLoading || isTeachingSessionLoading) return <Loading />;
  if (isChildError || isTeachingSessionError || !child)
    return <div>Error loading child.</div>;

  return (
    <div>
      <div className="flex items-center gap-40">
        {/* Children's  */}
        <div className="relative p-4 w-[500px]">
          <Card className="w-full relative z-10 flex items-center gap-4 p-4 bg-customgreys-dirtyBlueGrey border-none shadow-xl">
            {/* Avatar */}
            <div
              className="w-32 h-32 aspect-square rounded-full flex items-center justify-center 
          text-6xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
            >
              {child.profile?.full_name.charAt(0)}
            </div>

            {/* Info */}
            <div>
              <CardHeader className="flex justify-between p-2">
                <CardTitle>
                  <span className="text-primary-200 rounded-2xl text-xl font-bold">
                    {child.profile?.full_name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-white-50 p-2">
                <p>
                  <strong>Age: </strong>
                  {calculateAge(child.date_of_birth)}
                </p>
                <p>
                  <strong>Date of Birth: </strong>
                  {child.date_of_birth.split("T")[0]}
                </p>
                <p>
                  <strong>Learning Goals: </strong>
                  {child.learning_goals}
                </p>
              </CardContent>
            </div>
          </Card>

          <div className="absolute -right-14 bottom-[20px] flex flex-col gap-2 z-0">
            <button
              onClick={() => router.push("/parent/children")}
              className="px-4 py-2 bg-[#3C415C] text-end text-white rounded-lg shadow-md hover:bg-gray-600"
            >
              <span>&lt;&lt; Back</span>
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-primary-750 text-white rounded-lg shadow-md hover:bg-primary-700"
                >
                  Edit
                </Button>
              </DialogTrigger>

              <ChildDialog
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                handleClose={handleClose}
                mode="edit"
              />
            </Dialog>
          </div>
        </div>

        {/* Event Info */}
        {selectedEvent && (
          // <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
          //   <SessionDetailDialog session={selectedEvent} refetch={refetch} />
          // </Dialog>
          <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
            <SessionDetailDialog
              session={selectedEvent}
              refetch={() => refetch()}
              isTutor={false}
            />
          </Dialog>
        )}
      </div>

      {/* Schedule */}
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

export default ChildSchedule;
