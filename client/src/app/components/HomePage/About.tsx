import {
  aboutSectionParallaxImage,
  aboutSectionTextReveal,
} from "@/utils/gsap-utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import SplitType from "split-type";
import bg2 from "../../asset/img/tutor5.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutImageRef = useRef<HTMLDivElement | null>(null);
  const aboutWrapperRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const text = SplitType.create(".reveal_text");

    // Parallax animation
    aboutSectionParallaxImage(aboutWrapperRef, aboutImageRef);
    // Text reveal animation
    aboutSectionTextReveal(text, aboutWrapperRef);
  }, []);

  return (
    <div ref={aboutWrapperRef}>
      <div className="grid grid-cols-2 py-10 text-orange-400">
        <div
          ref={aboutImageRef}
          className="w-[40vw] relative aspect-[1/1.2]"
          style={{
            transform: "translateY(30%)",
          }}
        >
          <Image src={bg2} alt="" className="w-full" fill />
        </div>
        <div className="uppercase text-[max(1.146vw,22px)] my-[30%]">
          <div className="reveal_text max-w-[31rem] overflow-hidden 2xl:max-w-[50rem]  font-mono leading-tight">
            Are you ready for studie?
          </div>
          {/* <div className="my-[10%] flex justify-center">
            <button className="bg-blue-950 text-white-100 rounded-xl p-3">Enroll Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default About;
