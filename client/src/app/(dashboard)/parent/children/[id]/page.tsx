"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound, useParams, useRouter } from "next/navigation";
import { useGetChildQuery, useUpdateChildrenMutation } from "@/state/api";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChildDialog } from "@/components/dashboard/parent/ChildDialog";
import { useState } from "react";
import Loading from "@/components/Loading";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { TeachingSession } from "@/types";
import moment from "moment";

const ChildSchedule = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: child, isLoading, isError } = useGetChildQuery({ id });

  const [selectedEvent, setSelectedEvent] = useState<TeachingSession | null>(
    null
  );
  const [updateChild] = useUpdateChildrenMutation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    full_name: "",
    password: "",
    age: "",
    grade_level: "",
    learning_goals: "",
  });

  const handleEdit = () => {
    if (child) {
      setFormData({
        full_name: child.full_name || "",
        password: child.password || "",
        age: child.age?.toString() || "",
        grade_level: child.grade_level || "",
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
        age: parseInt(formData.age),
        grade_level: formData.grade_level,
        learning_goals: formData.learning_goals,
      }).unwrap();

      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (isLoading) return <Loading />;
  if (isError || !child) return <div>Error loading courses.</div>;

  console.log("Selected Event:", selectedEvent);

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
              {child.full_name.charAt(0)}
            </div>

            {/* Info */}
            <div>
              <CardHeader className="flex justify-between p-2">
                <CardTitle>
                  <span className="text-primary-200 rounded-2xl text-xl font-bold">
                    {child.full_name}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base text-white-50 p-2">
                <p>
                  <strong>Age: </strong>
                  {child.age}
                </p>
                <p>
                  <strong>Grade Level: </strong>
                  {child.grade_level}
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
          <div className="w-[350px] p-4 bg-[#3C415C] rounded-md shadow-lg">
            <h2 className="text-lg font-semibold text-primary-100">
              Course Details
            </h2>
            <p>
              <strong>Subject:</strong>{" "}
              {selectedEvent.subscription?.course?.title || "No Title"}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {moment(selectedEvent.startTime).format("HH:mm")} -{" "}
              {moment(selectedEvent.endTime).format("HH:mm")}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {selectedEvent.subscription?.course?.description ||
                "No Description"}
            </p>
            <p>
              <strong>Tutor:</strong>{" "}
              {selectedEvent.subscription?.course?.tutor?.profile?.full_name ||
                "Unknown"}
            </p>
            <p>
              <strong>Google Meet:</strong>
              <a
                href={selectedEvent.google_meet_id}
                target="_blank"
                className="text-blue-500 underline"
              >
                Join
              </a>
            </p>
          </div>
        )}
      </div>

      {/* Schedule */}
      <div className="mt-4 bg-white rounded-md p-4">
        <h1>Teacher&apos;s Schedule</h1>
        <BigCalendarContainer id={child.id} onSelectEvent={setSelectedEvent} />
      </div>
    </div>
  );
};

export default ChildSchedule;
