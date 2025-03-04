import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { format } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useForm } from "react-hook-form";
import ChildrenSelector from "./children-selector";
import { useRouter } from "next/navigation";
import CoursesDetails from "./course-details";
import { useAppDispatch } from "@/state/redux";
import { setSelectedBookingDates } from "@/state";
import CoursePreview from "./CoursePreview";

type Props = {
  course: Course;
  availabilities: { date: string; slots: string[] }[];
};

const BookingForm = ({ availabilities, course }: Props) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const availableDays = availabilities.map((day) => new Date(day.date));

  const timeSlotsByDate = selectedDates.map((date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return {
      date: formattedDate,
      slots:
        availabilities.find((day) => day.date === formattedDate)?.slots || [],
    };
  });

  const handleNextStep = async () => {
    const formattedBookings = selectedDates.map((date, index) => {
      const startTime = new Date(
        `${format(date, "yyyy-MM-dd")}T${selectedTimes[index]}`
      );
      const endTime = new Date(startTime.getTime() + 50 * 60000); // Giả sử course.duration là phút

      return {
        startTime: startTime.toISOString(), // Định dạng ISO cho API
        endTime: endTime.toISOString(), // Định dạng ISO cho API
      };
    });

    console.log(formattedBookings);
    dispatch(setSelectedBookingDates(formattedBookings));

    router.push(`/checkout?step=2&id=${course.id}`);
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <CoursesDetails course={course} />
      {/* <CoursePreview course={course} /> */}

      <div className="flex flex-col gap-8 p-10 border bg-customgreys-primarybg">
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
                            selectedTimes[index] === slot
                              ? "outline"
                              : "default"
                          }
                          className="border-gray-400 hover:text-gray-500 bg-customgreys-secondarybg"
                          onClick={() => {
                            const newTimes = [...selectedTimes];
                            newTimes[index] = slot;
                            setSelectedTimes(newTimes);
                          }}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
                <Button
                  className="mt-4 text-gray-100 bg-primary-700 hover:bg-primary-600 "
                  onClick={handleNextStep}
                  disabled={selectedTimes.length === 0}
                >
                  Choose your Children
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
