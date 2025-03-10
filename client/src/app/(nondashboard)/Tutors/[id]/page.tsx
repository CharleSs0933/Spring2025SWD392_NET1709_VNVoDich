"use client";
import { useGetTutorQuery } from "@/state/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import tutors from "../../../../asset/img/tutor3.jpg";
import Review from "@/app/component/Review";
const TutorDetail = () => {
  const { id } = useParams();
  const tutorId = Array.isArray(id) ? id[0] : id;
  const {
    data: tutor,
    isLoading,
    isError,
  } = useGetTutorQuery(tutorId as string, { skip: !id });
  console.log(tutorId, "ok");
  console.log(tutor, "tutor");
  if (isLoading) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (isError)
    return (
      <p className="text-center text-red-500">Error loading tutor details.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <div className="relative w-full h-[400px]  rounded-lg overflow-hidden ">
        <Image
          src={tutors || "/default-tutor.jpg"}
          alt={tutor?.profile?.full_name || "Tutor Image"}
          layout="fill"
          objectFit="cover"
          objectPosition="center 30%"
          className="opacity-40"
        />
        <div className="absolute top-[70%] mx-6 text-white">
          <h1 className="text-3xl font-bold">{tutor?.profile?.full_name}</h1>
          <p className="text-gray-300">{tutor?.qualifications}</p>
        </div>
      </div>
      <div className="border p-6 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">About Tutor</h2>
        <p className="text-gray-600 mt-2">{tutor?.bio}</p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-orange-500">
              {" "}
              Teaching Style
            </h3>
            <p className="text-gray-600">
              {tutor?.teaching_style || "Not specified"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-orange-500">
              {" "}
              Qualifications
            </h3>
            <p className="text-gray-600">
              {tutor?.qualifications || "Not specified"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-orange-500">
            Contact Information
          </h3>
          <p className="text-gray-600">Email: {tutor?.profile?.email}</p>
          <p className="text-gray-600">Phone: {tutor?.profile?.phone}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Demo Video</h3>
        <video controls className="w-full rounded-lg shadow-md">
          <source src={tutor?.demo_video_url} type="video/mp4" />
        </video>
      </div>
      <div>{/* <Review comments={tutor?.tutorReviews || []} /> */}</div>
    </div>
  );
};

export default TutorDetail;
