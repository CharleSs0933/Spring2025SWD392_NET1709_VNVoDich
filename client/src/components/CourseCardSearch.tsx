import { formatPrice } from "@/lib/utils";
import { SearchCourseCardProps } from "@/types";
import Image from "next/image";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  return (
    <div
      onClick={onClick}
      className={` mx-4 bg-customgreys-secondarybg overflow-hidden rounded-lg shadow-lg group hover:bg-white-100/10 transition 
        duration-200 flex flex-col cursor-pointer border-2 h-full group ${
          isSelected ? "border-primary-600" : "border-transparent"
        }`}
    >
      <div className="relative w-auto pt-[56.25%]">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform"
        />
      </div>
      <div className="flex-grow flex flex-col justify-between w-full h-full p-6">
        <div className="group-hover:text-black">
          <h2 className="text-md lg:text-lg font-semibold line-clamp-2">
            {course.title}
          </h2>
          <p className="text-sm mt-1 line-clamp-2">{course.description}</p>
        </div>
        <div className="mt-2">
          <p className="text-customgreys-dirtyGrey text-sm">
            By {course.tutor?.id}
          </p>
          <div className="flex justify-between items-center mt-1">
            <span className="text-primary-500 text-2xl font-semibold group-hover:text-red-500">
              {formatPrice(course.price)}
            </span>
            <span className="text-customgreys-dirtyGrey text-sm">
              1000 Enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSearch;
