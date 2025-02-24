"use client";
import Image from "next/image";
import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import imgBg from "../../../asset/img/khoahoc.jpg";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollToPlugin);

interface CardProp {
  data: any;
  type: "course" | "tutor";
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  cardRef: React.RefObject<HTMLDivElement>;
}
export const Card = React.memo(
  ({ data, type, index, hovered, setHovered, cardRef }: CardProp) => {
    const router = useRouter();
    const handleMouseEnter = () => {
      setHovered(index);
      if (cardRef.current) {
        const elementTop = cardRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        const scrollToY =
          elementTop - windowHeight / 2 + cardRef.current.offsetHeight / 2;

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
      setHovered(null);

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
    };

    const handleOnClick = (item: string) => {
      if(type === "course"){
        router.push(`/Courses/${item}`);
      }else{
        router.push(`/Tutors/${item}`)
      }
    };

    useLayoutEffect(() => {
      gsap.fromTo(
        cardRef.current,
        { x: -100, opacity: 0, scale: 0.7 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "back.in",
          scale: 1,
        }
      );
    }, []);

    return (
      <div className="flex ">
        <div
          ref={cardRef}
          onClick={() => handleOnClick(data.id as string)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "rounded-2xl relative bg-gray-100 cursor-pointer   dark:bg-neutral-900 overflow-hidden h-80 md:h-[450px] ml-[5%]  w-full transition-all duration-300 ease-out",
            hovered !== null &&
              hovered !== index &&
              "blur-sm scale-[0.98] shadow-2xl shadow-rose-400 ",
            hovered === index && "shadow-2xl shadow-white-100"
          )}
        >
          <Image
            src={imgBg || data?.image}
            alt={data?.title ||data?.user?.full_name}
            fill
            className="object-cover absolute inset-0"
          />
          <div
            className={cn(
              "absolute inset-0 bg-black/50 flex flex-col justify-end py-6 px-4 transition-opacity duration-300 ",
              hovered === index ? "opacity-100 " : "opacity-100"
            )}
          >
            <h3 className="text-2xl font-bold text-white">
              {data?.title || data?.qualifications}
            </h3>
            <p className="text-gray-300 text-sm mb-2">{data?.description || data?.user?.full_name}</p>
            {type === 'course' && (
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {data?.status}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                ${data?.price}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {data?.total_lessons} Lessons
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                Grade {data?.grade}
              </span>
            </div>
            )}
            <div className="flex justify-between">
              <p className="text-sm font-medium text-yellow-400 gap-5">
                {data?.tutor?.profile?.full_name || data?.qualifications}
              </p>
              {type === "tutor" &&(
                <p className="text-sm font-medium text-yellow-400"> {data?.teaching_style}</p>
              )}
              {type === "course" && (

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
              )}
            </div>
          </div>
        </div>
        {type === "tutor" && (
        <div
          className={cn(
            "flex  justify-center items-center transition-all duration-300",
            hovered !== null && hovered === index ? "opacity-1 -translate-x-24  duration-300 transition-all" : "opacity-0 translate-x-0 duration-300"
          )}
        >
          <video
            src="https://res.cloudinary.com/dq11x4tkw/video/upload/v1730914573/videos/072516-9-cortado_ihrtev.mp4"
            width={500}
            loop
            autoPlay
            muted
            height={200}
            className="object-cover"
          />
        </div>

         )}  
      </div>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({
  data,
  type,
}: {
  data: any[];
  type: "course" | "tutor";
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[100%] ${type === 'tutor' ? "md:grid-cols-1 lg:grid-cols-1 w-[70%]   ml-[10%] -translate-x-14 " : ''}  md:px-8 w-full`}>
      {data.map((item, index) => {
        if (!cardRefs.current[index]) {
          cardRefs.current[index] = document.createElement("div"); 
        }

        return (
          <Card
            type={type}
            key={index}
            data={item}
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
