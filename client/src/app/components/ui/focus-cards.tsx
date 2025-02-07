"use client";
import Image from "next/image";
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import imgBg from "@/app/asset/img/khoahoc.jpg";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const Card = React.memo(
  ({
    course,
    tutor,
    index,
    hovered,
    setHovered,
    cardRef,
  }: {
    course: any;
    tutor: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    cardRef: React.RefObject<HTMLDivElement>;
  }) => {
    
    const handleMouseEnter = () => {
      setHovered(index);
      if (cardRef.current) {
        const elementTop = cardRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollToY = elementTop - windowHeight / 2 + cardRef.current.offsetHeight / 2; 
    
        const animation = gsap.to(window, {
          scrollTo: { y: scrollToY, autoKill: false },
          duration: 1,
        });
    
        const cancelScroll = () => {
          animation.kill(); 
          window.removeEventListener("wheel", cancelScroll);
        };
    
        window.addEventListener("wheel", cancelScroll, { passive: true });
      }
      gsap.fromTo(
        cardRef.current,
        { x: 0, opacity: 0, scale: 1 },
        {
          x: -40,
          opacity: 1,
          scale: 0.9,
          duration: 1,
          
          
        }
      );
    };
    const handleMouseLeave = () => {
      setHovered(null)

      gsap.fromTo(
        cardRef.current,
        { x: -40, opacity: 1, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          
          
        }
      );
    }
    
    useLayoutEffect(() => {
      gsap.fromTo(
        cardRef.current,
        { x: -100, opacity: 0, scale: 0.7},
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "back.in",
        scale: 1
      }
      );
  
    },[])

    return (
      <div className="flex gap-[5%]">
        <div
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-80 md:h-[450px] ml-[5%] w-full transition-all duration-300 ease-out",
            hovered !== null &&
              hovered !== index &&
              "blur-sm scale-[0.98] shadow-2xl shadow-rose-400 ",
            hovered === index && "shadow-2xl shadow-white-100"
          )}
        >
          <Image
            src={course.image || imgBg}
            alt={course.title}
            fill
            className="object-cover absolute inset-0"
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex flex-col justify-end py-6 px-4 transition-opacity duration-300 ",
              hovered === index ? "opacity-100 " : "opacity-100"
            )}
          >
            <h3 className="text-2xl font-bold text-white">{course.title}</h3>
            <p className="text-gray-300 text-sm mb-2">{course.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {course.status}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ${course.price}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {course.total_lessons} Lessons
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Grade {course.grade}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-yellow-400">
                {tutor?.full_name || "Expert Tutor"}
              </p>
              <button className="flex items-center justify-center bg-rose-900 text-white px-4 py-2 rounded-lg hover:bg-red-100 hover:text-black transition-colors">
                <span className="mr-2">Enroll</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={cn(
            "flex justify-center items-center transition-all duration-300",
            hovered !== null && hovered === index ? "opacity-1" : "opacity-0"
          )}
        >
          Video
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({
  courses,
  tutors,
}: {
  courses: any[];
  tutors: any[];
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-10 max-w-7xl md:px-8 w-full">
      {courses.map((course, index) => {
        const tutor = tutors?.find((t) => t.id === course.tutor_id);
        
        if (!cardRefs.current[index]) {
          cardRefs.current[index] = document.createElement("div");
        }

        return (
          <Card
            key={course.id}
            course={course}
            tutor={tutor}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
            cardRef={{ current: cardRefs.current[index] as HTMLDivElement }}
          />
        );
      })}
    </div>
  );
}
