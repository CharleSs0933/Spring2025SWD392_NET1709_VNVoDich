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
        <div className="uppercase text-[max(1.146vw,22px)] my-auto">
          <div className="reveal_text max-w-[31rem] overflow-hidden 2xl:max-w-[50rem] [&>div:first-child]:ms-64 font-mono leading-tight">
            I&apos;m a dedicated tutor with a passion for teaching and helping
            students develop their skills in a comprehensive and effective way.
            With years of experience in education, I specialize in providing
            personalized lessons tailored to each student’s needs and learning
            style. My approach focuses on making learning engaging and
            interactive, ensuring that students not only understand the subject
            but also enjoy the process. Whether you need help with academic
            subjects, exam preparation, or skill development, I am here to guide
            and support you every step of the way. Let’s work together to
            achieve your learning goals!
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
