import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Course } from "@/types";
import { useAppSelector } from "@/state/redux";
import { format } from "date-fns";
import { calculateAge, formatPrice } from "@/lib/utils";

export default function CourseDetails({ course }: { course: Course }) {
  const { selectedDates, selectedChild } = useAppSelector(
    (state) => state.global.booking
  );
  const price = formatPrice(course.price);
  return (
    <div className="p-10  bg-background bg-customgreys-secondarybg">
      <h1 className="text-3xl font-bold ">{course.title}</h1>
      <p className="text-gray-400 mb-4">{course.description}</p>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          {/* <AvatarImage src={tutor} alt={course.tutor?.profile?.full_name} /> */}
          <AvatarFallback className="bg-primary-700 text-white font-extrabold">
            {course.tutor?.profile?.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {course.tutor?.profile?.full_name}
          </h2>
          <p className="text-gray-600">{course.tutor?.profile?.email}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Clock className="mr-2" />
        <span>50 minutes</span>
      </div>
      <div className="flex items-center mb-4">
        <Calendar className="mr-2" />
        <span>Google Meet</span>
      </div>
      {selectedDates.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Schedule:</h3>
          <ul className="list-disc pl-5">
            {selectedDates.map((booking, index) => (
              <li key={index} className="text-gray-600">
                {format(new Date(booking.startTime), "EEEE 'at' hh:mm a")} -{" "}
                {format(new Date(booking.endTime), "hh:mm a")}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Hiển thị thông tin child đã chọn */}
      {selectedChild !== null && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Selected Child:</h3>
          <div className="text-gray-600">
            <p>
              <span className="font-medium">Name:</span>
              {selectedChild.profile?.full_name}
            </p>
            <p>
              <span className="font-medium">Age:</span>{" "}
              {calculateAge(selectedChild.date_of_birth)}
            </p>
          </div>
        </div>
      )}
      <div className="w-full bg-customgreys-secondarybg flex flex-col  rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Price Details</h3>
        <div className="flex justify-between mb-2 text-customgreys-dirtyGrey text-base">
          <span className="font-bold">1x {course.title}</span>
          <span className="font-bold">{price}</span>
        </div>
        <div className="flex justify-between border-t border-customgreys-dirtyGrey pt-4">
          <span className="font-bold text-lg">Total Amount</span>
          <span className="font-bold text-lg">{price}</span>
        </div>
      </div>
    </div>
  );
}
