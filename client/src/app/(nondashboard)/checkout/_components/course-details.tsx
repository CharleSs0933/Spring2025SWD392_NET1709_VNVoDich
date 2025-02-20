import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Course } from "@/types";

export default function CoursesDetails({ course }: { course: Course }) {
  return (
    <div className="p-10 lg:w-1/3 bg-background bg-customgreys-secondarybg">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <div className="flex items-center mb-4">
        {/* <Avatar className="w-12 h-12 mr-4">
          <AvatarImage src={course.tutor?.profile.} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar> */}
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
      <p className="text-gray-400">{course.description}</p>
    </div>
  );
}
