import { useCarousel } from "@/hooks/useCarousel";
import { useGetCoursesQuery, useGetTutorsQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import LoadingSkeleton from "./LoadingSkeletion";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const TutorCard = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  
  const imgs = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const {
    data: tutor,
    isLoading: isTutorsLoading,
    isError: isTutorsError,
  } = useGetTutorsQuery({});
  
  const {
    data: courses,
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: number) => {
    router.push(`search?id=${courseId}`, { scroll: false });
  };

  useEffect(() => {
    if (tutor && courses) {
      const updatedTestimonials = tutor.map((item, index) => {
        const course = courses.find((course) => course.tutor_id === item.id);
        
        return {
          quote: course?.tutor?.bio || "No bio available",
          name: item.full_name || "Unknown",
          designation: course?.tutor?.qualifications || "No qualifications available",
          src:  imgs[index % imgs.length],
        };
      });
      setTestimonials(updatedTestimonials);
      

    }
  }, [tutor, courses]); 
  console.log(testimonials, 'ok chưa')
  if (isCoursesLoading || isTutorsLoading) return <LoadingSkeleton />;

  return (
    <div>
      {testimonials.length > 0 ? (
        <AnimatedTestimonials testimonials={testimonials} />
      ) : (
        <LoadingSkeleton /> 
      )}
    </div>
  );
};

export default TutorCard;
