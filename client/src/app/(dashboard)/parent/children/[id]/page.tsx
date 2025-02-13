"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useGetChildQuery } from "@/state/api";
import { X } from "lucide-react";
import BigCalendar from "@/app/components/BigCalendar";

const ChildSchedule = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const parent_id = params.id as string;
  const { data: child, isLoading, error } = useGetChildQuery({ parent_id, id });

  console.log(parent_id, id);
  return (
    <div>
      <motion.div
        className=" bg-white shadow-lg p-4 rounded-lg  "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="w-[400px] relative">
          <CardHeader className="flex justify-between items-center">
            <CardTitle>
              <span className="bg-customgreys-purpleGrey text-gray-700 rounded-2xl px-3 py-1">
                {child?.full_name}
                Name
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
              {child?.age}
            </p>
            <p>
              <strong>Grade Level: </strong>
              {child?.grade_level}
            </p>
            <p>
              <strong>Learning Goals: </strong>
              {child?.learning_goals}
              pass subject
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
        <h1>Teacher&apos;s Schedule</h1>
        <BigCalendar />
      </div>
    </div>
  );
};

export default ChildSchedule;
