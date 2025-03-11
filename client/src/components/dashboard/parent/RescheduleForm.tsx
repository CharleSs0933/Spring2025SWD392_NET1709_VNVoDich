import { Button } from "@/components/ui/button";
import { useUpdateSessionMutation } from "@/state/api";
import { addHours, format, parse } from "date-fns";
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

const RescheduleForm = ({
  availabilities,
  sessionId,
  refetch,
  setShowReschedule,
}: {
  availabilities: { date: string; slots: string[] }[];
  sessionId: number;
  refetch: () => void;
  setShowReschedule: (show: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");

  const availableDays = availabilities.map((day) => new Date(day.date));

  const timeSlots = selectedDate
    ? availabilities.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  const [rescheduleSession] = useUpdateSessionMutation();

  const handleReschedule = async () => {
    if (!selectedDate || !selectedTime) return;

    // Calculate new start and end times
    const startTime = addHours(
      parse(
        `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`,
        "yyyy-MM-dd'T'HH:mm",
        new Date()
      ),
      7
    );

    const endTime = new Date(startTime.getTime() + 50 * 60000);

    await rescheduleSession({
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      id: sessionId,
    }).unwrap();

    refetch();
    setShowReschedule(false);
  };

  return (
    <div className="w-full md:w-3/5 bg-[#1b1c22] p-6 text-white">
      <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-3">
        <h2 className="text-2xl font-bold">Reschedule Session</h2>
      </div>

      <div className="flex flex-col gap-8">
        <div className="md:h-96 flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              Select Date
            </h3>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedTime(""); // Reset selected time when date changes
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
              className="bg-customgreys-secondarybg p-4 rounded-lg"
              styles={{
                caption: { color: "#e2e8f0", fontSize: "1.1rem" },
                day: { margin: "0.2em", fontSize: "1rem" },
                head_cell: { color: "#e2e8f0" },
              }}
            />
          </div>

          <div className="w-full h-full md:overflow-scroll no-scrollbar">
            {selectedDate && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-300 mb-2">
                  Available Time Slots
                </h3>

                <h4 className="font-medium text-gray-300">
                  {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                  {timeSlots.map((slot) => (
                    <div key={slot} className="">
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        onClick={() => setSelectedTime(slot)}
                        className={`border-gray-600 ${
                          selectedTime === slot
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-customgreys-secondarybg hover:bg-gray-700 text-white"
                        }`}
                      >
                        {slot}
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-2"
                  onClick={handleReschedule}
                  disabled={!selectedDate && !selectedTime}
                >
                  Confirm Reschedule
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleForm;
