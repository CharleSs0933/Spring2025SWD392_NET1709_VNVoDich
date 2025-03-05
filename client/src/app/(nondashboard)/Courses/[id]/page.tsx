"use client";
import { useState } from "react";
import { useGetCourseQuery } from "@/state/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import imgBg from "../../../../asset/img/khoahoc.jpg";
import tutor from "../../../../asset/img/tutor3.jpg";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import Review from "@/app/component/Review";

const CoursesDetail = () => {
  const { id } = useParams();
  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseQuery(id as string, { skip: !id });
  const router = useRouter();

  console.log(course);

  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const handleEnrollNow = () => {
    router.push(`/checkout?step=1&id=${id}`, {
      scroll: false,
    });
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading course details.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden ">
        <Image
          src={imgBg}
          alt={course?.title || "Course Image"}
          layout="fill"
          objectFit="cover"
          className="opacity-40"
        />
        <div className="text-start flex flex-col top-[30%] space-y-2 absolute mx-2  inset-0 z-20">
          <div className="my-4">
            <h1 className="text-3xl font-bold text-white-100 font-serif ">
              {course?.title}
            </h1>
            <p className="text-gray-400 my-5">{course?.description}</p>
            <div className="flex gap-2   items-center">
              <Image
                src={tutor}
                alt="tutor"
                width={30}
                height={20}
                className="rounded-full w-10 h-10 "
              />
              <p className="text-orange-400 font-semibold text-lg hover:underline cursor-pointer">
                {course?.tutor?.profile?.full_name}
              </p>
            </div>
          </div>
          <div className="border-2 border-blue-600 text-white-100 w-1/6 p-5 flex justify-center items-center rounded-md  bg-blue-800 font-semibold text-lg ">
            <button onClick={() => handleEnrollNow()}>
              Enroll Now ({course?.price} $)
            </button>
          </div>
          <p className="text-gray-300">Sponsored by FPT University</p>
          <div className="flex gap-2">
            <p className="font-semibold">41,387 </p>
            <p>already enrolled</p>
          </div>
        </div>
      </div>
      <div className="flex gap-5 border w-[80%] p-10 bg-white-100 text-black">
        <div className="underline cursor-pointer px-3 text-lg font-semibold">
          {course?.lessons?.length} Courses series
        </div>
        <div className="border-l px-3 text-lg font-semibold flex items-center gap-2">
          {course?.grade} <Star size={15} color="blue" />
        </div>
        <div className="border-l px-3 text-lg font-semibold">
          Beginner level
        </div>

        <div className="border-l px-3 text-lg font-semibold">1 month</div>
        <div className="border-l px-3 text-lg font-semibold">
          Flexible schedule
        </div>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {course?.lessons?.map((lesson: any) => {
            const isExpanded = expandedLesson === lesson.id;

            return (
              <div key={lesson.id} className="bg-white p-4 rounded-md shadow">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setExpandedLesson(isExpanded ? null : lesson.id)
                  }
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {lesson.title}
                  </h3>
                  {isExpanded ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </div>

                <p
                  className={`text-sm text-gray-600 mt-2 ${
                    isExpanded ? "block" : "line-clamp-2"
                  }`}
                >
                  {lesson.description}
                </p>

                {isExpanded && (
                  <div className="mt-2 text-sm text-gray-700 space-y-2">
                    <p>
                      <strong>🎯 Learning Objectives:</strong>{" "}
                      {lesson.learning_objectives || "Not provided"}
                    </p>
                    <p>
                      <strong>📌 Materials Needed:</strong>{" "}
                      {lesson.materials_needed || "Not required"}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* {course?.tutor?.demo_video_url && ( */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Demo Video</h3>
        <video controls className="w-full rounded-lg shadow-md">
          <source src={course?.tutor?.demo_video_url} type="video/mp4" />
        </video>
      </div>

      {/* )} */}
      <div>
        <Review comments={course?.courseReviews || []} />
      </div>
    </div>
  );
};

export default CoursesDetail;
