// import { Button } from "@/components/ui/button";
// import { Course } from "@/types";
// import { addHours, format, parse } from "date-fns";
// import React, { useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
// import { useRouter } from "next/navigation";
// import CoursesDetails from "./course-details";
// import { useAppDispatch } from "@/state/redux";
// import { setSelectedBookingDates } from "@/state";

// type Props = {
//   course: Course;
//   availabilities: { date: string; slots: string[] }[];
// };

// const BookingForm = ({ availabilities, course }: Props) => {
//   const [selectedDates, setSelectedDates] = useState<Date[]>([]);
//   const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const availableDays = availabilities.map((day) => new Date(day.date));

//   const timeSlotsByDate = selectedDates.map((date) => {
//     const formattedDate = format(date, "yyyy-MM-dd");
//     return {
//       date: formattedDate,
//       slots:
//         availabilities.find((day) => day.date === formattedDate)?.slots || [],
//     };
//   });

//   const handleNextStep = async () => {
//     const formattedBookings = selectedDates.map((date, index) => {
//       console.log(date);
//       console.log(selectedTimes[index]);
//       // const startTime = new Date(
//       //   `${format(date, "yyyy-MM-dd")}T${selectedTimes[index]}`
//       // );

//       const startTime = addHours(
//         parse(
//           `${format(date, "yyyy-MM-dd")}T${selectedTimes[index]}`,
//           "yyyy-MM-dd'T'HH:mm",
//           new Date()
//         ),
//         7
//       );
//       const endTime = new Date(startTime.getTime() + 50 * 60000); // Giả sử course.duration là phút

//       return {
//         startTime: startTime.toISOString(), // Định dạng ISO cho API
//         endTime: endTime.toISOString(), // Định dạng ISO cho API
//       };
//     });

//     console.log(formattedBookings);
//     dispatch(setSelectedBookingDates(formattedBookings));

//     router.push(`/checkout?step=2&id=${course.id}`);
//   };

//   return (
//     <div className="flex flex-col justify-center lg:flex-row">
//       <CoursesDetails course={course} />
//       {/* <CoursePreview course={course} /> */}

//       <div className="flex flex-col gap-8 p-10 border bg-customgreys-primarybg">
//         <div className="md:h-96 flex flex-col md:flex-row gap-5 ">
//           <div className="w-full">
//             <DayPicker
//               mode="multiple"
//               selected={selectedDates}
//               onSelect={(date) => {
//                 setSelectedDates(date || []);
//                 setSelectedTimes([]);
//               }}
//               disabled={[{ before: new Date() }]}
//               modifiers={{ available: availableDays }}
//               modifiersStyles={{
//                 available: {
//                   background: "lightblue",
//                   color: "#1B1C22",
//                   borderRadius: 100,
//                 },
//               }}
//             />
//           </div>
//           <div className="w-full h-full md:overflow-scroll no-scrollbar">
//             {selectedDates.length > 0 && (
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold mb-2">
//                   Available Time Slots
//                 </h3>
//                 {timeSlotsByDate.map((day, index) => (
//                   <div key={day.date} className="mb-4">
//                     <h4 className="font-medium">{day.date}</h4>
//                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
//                       {day.slots.map((slot) => (
//                         <Button
//                           key={slot}
//                           variant={
//                             selectedTimes[index] === slot
//                               ? "outline"
//                               : "default"
//                           }
//                           className="border-gray-400 hover:text-gray-500 bg-customgreys-secondarybg"
//                           onClick={() => {
//                             const newTimes = [...selectedTimes];
//                             newTimes[index] = slot;
//                             setSelectedTimes(newTimes);
//                           }}
//                         >
//                           {slot}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//                 <Button
//                   className="mt-4 text-gray-100 bg-primary-700 hover:bg-primary-600 "
//                   onClick={handleNextStep}
//                   disabled={selectedTimes.length === 0}
//                 >
//                   Choose your Children
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingForm;

import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { addHours, format, parse } from "date-fns";
import React, { useState } from "react";
import "react-day-picker/style.css";
import { useRouter } from "next/navigation";
import CoursesDetails from "./course-details";
import { useAppDispatch } from "@/state/redux";
import { setSelectedBookingDates } from "@/state";

type Props = {
  course: Course;
  availabilities: { date: string; slots: string[] }[];
};

const WEEKDAYS = [
  { name: "Sunday", value: 0 },
  { name: "Monday", value: 1 },
  { name: "Tuesday", value: 2 },
  { name: "Wednesday", value: 3 },
  { name: "Thursday", value: 4 },
  { name: "Friday", value: 5 },
  { name: "Saturday", value: 6 },
];

const BookingForm = ({ availabilities, course }: Props) => {
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();

  // Group availabilities by weekday
  const availabilitiesByWeekday = WEEKDAYS.map((weekday) => {
    const slots = availabilities
      .filter((availability) => {
        const date = new Date(availability.date);
        return date.getDay() === weekday.value;
      })
      .flatMap((availability) => availability.slots);

    // Get unique slots
    const uniqueSlots = Array.from(new Set(slots));

    return {
      weekday: weekday.value,
      name: weekday.name,
      slots: uniqueSlots,
    };
  }).filter((day) => day.slots.length > 0); // Only show days with available slots

  const handleWeekdayToggle = (weekdayValue: number) => {
    if (selectedWeekdays.includes(weekdayValue)) {
      setSelectedWeekdays(
        selectedWeekdays.filter((day) => day !== weekdayValue)
      );
      setSelectedTimes(
        selectedTimes.filter((_, index) => {
          return selectedWeekdays[index] !== weekdayValue;
        })
      );
    } else {
      setSelectedWeekdays([...selectedWeekdays, weekdayValue]);
    }
  };

  const handleNextStep = async () => {
    // Calculate the next 4 weeks of the selected weekdays
    const today = new Date();
    const formattedBookings = [];

    // For each selected weekday
    for (let i = 0; i < selectedWeekdays.length; i++) {
      const weekday = selectedWeekdays[i];
      const timeSlot = selectedTimes[i];

      if (!timeSlot) continue;

      // Find the next occurrence of this weekday
      let nextDate = new Date(today);
      while (nextDate.getDay() !== weekday) {
        nextDate.setDate(nextDate.getDate() + 1);
      }

      const startTime = addHours(
        parse(
          `${format(nextDate, "yyyy-MM-dd")}T${timeSlot}`,
          "yyyy-MM-dd'T'HH:mm",
          new Date()
        ),
        7
      );
      const endTime = new Date(startTime.getTime() + 50 * 60000); // Giả sử course.duration là phút

      console.log(startTime);

      formattedBookings.push({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        dayOfWeek: weekday,
      });
    }

    dispatch(setSelectedBookingDates(formattedBookings));

    router.push(`/checkout?step=2&id=${course.id}`);
  };

  const isDayDisabled = (weekday: number) => {
    return (
      !course.lessons ||
      (!selectedWeekdays.includes(weekday) &&
        selectedWeekdays.length >= course.lessons.length)
    );
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row">
      <CoursesDetails course={course} />

      <div className="flex flex-col gap-8 p-10 border bg-customgreys-primarybg">
        <div className="md:h-96 flex flex-col md:flex-row gap-5">
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-4">
              Select Days of the Week
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {availabilitiesByWeekday.map((day) => (
                <Button
                  key={day.weekday}
                  type="button"
                  onClick={() => handleWeekdayToggle(day.weekday)}
                  variant={
                    selectedWeekdays.includes(day.weekday)
                      ? "default"
                      : "outline"
                  }
                  disabled={isDayDisabled(day.weekday)}
                  className={`rounded-full  border-gray-400 ${
                    selectedWeekdays.includes(day.weekday)
                      ? "text-gray-100 bg-primary-700 hover:bg-primary-600"
                      : "hover:text-gray-500"
                  }`}
                >
                  {day.name}
                </Button>
              ))}
            </div>
          </div>
          {selectedWeekdays.length > 0 && (
            <div className="w-full h-full md:overflow-scroll no-scrollbar">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  Available Time Slots
                </h3>
                {selectedWeekdays.map((weekday, index) => {
                  const dayInfo = availabilitiesByWeekday.find(
                    (day) => day.weekday === weekday
                  );

                  if (!dayInfo) return null;

                  return (
                    <div key={weekday} className="mb-4">
                      <h4 className="font-medium">{dayInfo.name}</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {dayInfo.slots.map((slot) => (
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
                  );
                })}
                <Button
                  className="mt-4 text-gray-100 bg-primary-700 hover:bg-primary-600"
                  onClick={handleNextStep}
                  disabled={selectedTimes.filter(Boolean).length === 0}
                >
                  Choose your Children
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
