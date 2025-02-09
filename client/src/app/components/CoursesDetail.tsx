import { Course } from '@/types';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import imgBg from "@/app/asset/img/khoahoc.jpg";

const CoursesDetail = ( item  : Course) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Course Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image 
          src={item.image || imgBg} 
          alt={item.title} 
          layout="fill" 
          objectFit="cover"
        />
      </div>

      {/* Course Title & Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <div className="flex items-center gap-4 mt-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {item.status}
          </span>
          <span className="text-gray-700 font-medium">Grade: {item.grade}</span>
          <span className="text-gray-700 font-medium">{item.total_lessons} Lessons</span>
          <span className="text-gray-700 font-medium">${item.price}</span>
        </div>
      </div>

      {/* Tutor Section */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg flex items-center">
        <Image 
          src={item.tutor?.image || '/placeholder-avatar.jpg'} 
          alt={item.tutor?.profile?.full_name || "IMAGE"} 
          width={80} 
          height={80} 
          className="rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{item.tutor?.profile?.full_name  }</h2>
          <p className="text-sm text-gray-600">{item.tutor?.bio}</p>
          <p className="text-sm text-gray-600">{item.tutor?.qualifications}</p>
        </div>
      </div>

      {/* Demo Video */}
      {item.tutor?.demo_video_url && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Demo Video</h3>
          <video controls className="w-full mt-2 rounded-lg">
            <source src={item.tutor.demo_video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Enroll Button */}
      <div className="mt-6 text-center">
        <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
          Enroll Now
        </Button>
      </div>
    </div>
  );
};

export default CoursesDetail;
