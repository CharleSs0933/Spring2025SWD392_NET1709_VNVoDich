import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/lib/schemas";
import { Children, Course } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import ChildrenSelector from "./children-selector";

type Props = {
  course: Course;
  availabilities: { date: string; slots: string[] }[];
  children: Children[];
};

const BookingForm = ({ course, availabilities, children }: Props) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [selectedChild, setSelectedChild] = useState<Children | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (selectedDates.length > 0) {
      const formattedDates = selectedDates.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      setValue("dates", formattedDates); // Giả sử schema hỗ trợ "dates" là mảng
    }
  }, [selectedDates, setValue]);

  useEffect(() => {
    if (selectedTimes.length > 0) {
      setValue("times", selectedTimes); // Giả sử schema hỗ trợ "times" là mảng
    }
  }, [selectedTimes, setValue]);

  const availableDays = availabilities.map((day) => new Date(day.date));

  const timeSlotsByDate = selectedDates.map((date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return {
      date: formattedDate,
      slots:
        availabilities.find((day) => day.date === formattedDate)?.slots || [],
    };
  });

  return (
    <div className="flex flex-col  gap-8 p-10 border bg-customgreys-primarybg">
      <div className="md:h-96 flex flex-col md:flex-row gap-5 ">
        <div className="w-full">
          <DayPicker
            mode="multiple"
            selected={selectedDates}
            onSelect={(date) => {
              setSelectedDates(date || []);
              setSelectedTimes([]);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              available: {
                background: "lightblue",
                color: "#1B1C22",
                borderRadius: 100,
              },
            }}
          />
        </div>
        <div className="w-full h-full md:overflow-scroll no-scrollbar">
          {selectedDates.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                Available Time Slots
              </h3>
              {timeSlotsByDate.map((day, index) => (
                <div key={day.date} className="mb-4">
                  <h4 className="font-medium">{day.date}</h4>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {day.slots.map((slot) => (
                      <Button
                        key={slot}
                        variant={
                          selectedTimes[index] === slot ? "outline" : "default"
                        }
                        className="border-gray-400 hover:text-gray-500 bg-customgreys-secondarybg"
                        onClick={() => {
                          const newTimes = [...selectedTimes];
                          newTimes[index] = slot; // Gán thời gian cho ngày tương ứng
                          setSelectedTimes(newTimes);
                        }}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedTimes.length > 0 && (
        <>
          <ChildrenSelector
            availableChildren={children}
            selectedChild={selectedChild}
            setSelectedChild={setSelectedChild}
          />
        </>
      )}
    </div>
  );
};

export default BookingForm;
