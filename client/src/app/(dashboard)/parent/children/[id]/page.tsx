"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound, useParams, useRouter } from "next/navigation";
import { useGetChildQuery, useUpdateChildrenMutation } from "@/state/api";
import { X } from "lucide-react";
import BigCalendar from "@/components/BigCalendar";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChildDialog } from "@/components/dashboard/parent/ChildDialog";
import { useState } from "react";
import Loading from "@/components/Loading";

const ChildSchedule = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: child, isLoading, isError } = useGetChildQuery({ id });

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

  return (
    <div>
      <div className="flex items-end bg-white shadow-lg p-4 rounded-lg  ">
        <Card className="w-[400px] relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>
              <span className="bg-customgreys-purpleGrey text-gray-700 rounded-2xl px-3 py-1">
                {child.full_name}
              </span>
              's Details
            </CardTitle>
            <button
              onClick={() => router.push("/parent/children")}
              className="absolute right-3 top-3"
            >
              <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
            </button>
          </CardHeader>
          <CardContent>
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
              pass subject
            </p>
          </CardContent>
        </Card>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleEdit}
              className="rounded-xl bg-customgreys-purpleGrey text-gray-900 mx-5
        hover:bg-primary-750 hover:text-white-50"
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
      <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
        <h1>Teacher&apos;s Schedule</h1>
        <BigCalendar id={child.id} />
      </div>
    </div>
  );
};

export default ChildSchedule;
