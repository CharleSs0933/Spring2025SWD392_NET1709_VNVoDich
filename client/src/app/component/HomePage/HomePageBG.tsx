import { cn } from "@/utils/cn";
import {
  artWorkSectionParallax,
  artWorkSectionScale,
} from "@/utils/gsap-utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { MutableRefObject, useLayoutEffect, useRef } from "react";
import bg from "../../asset/img/tutor4.jpg";
import bg2 from "../../asset/img/tutor3.jpg";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

const HomePageBG = () => {
  const artWorkWrapperRef = useRef<HTMLDivElement | null>(null);
  const artWorkParallaxImageRef = useRef<HTMLDivElement | null>(null);
  const artWorkScaleImageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const word1 = SplitType.create(".scale_slideup_text_1");
    const word2 = SplitType.create(".scale_slideup_text_2");
    // Parallax animation
    artWorkSectionParallax(artWorkWrapperRef, artWorkParallaxImageRef);

    // Scale animation
    artWorkSectionScale(artWorkWrapperRef, artWorkScaleImageRef, word1, word2);
  }, []);

  return (
    <div ref={artWorkWrapperRef}>
      <div className="pt-20 art_work_container relative h-screen">
        <ScaleImage artWorkScaleImageRef={artWorkScaleImageRef} />

        {/* <ParallaxImage
                    artWorkParallaxImageRef={artWorkParallaxImageRef}
                /> */}

        <div className="font-semibold text-white-50 w-full overflow-hidden h-fit absolute bottom-[10vw] text-center overflow-hidde z-10 flex justify-center gap-5">
          <SplitText className="scale_slideup_text_1">WelCome</SplitText>
          <SplitText className="scale_slideup_text_2">JUstin Do</SplitText>
        </div>

        <ImageOverlay />
      </div>
    </div>
  );
};

export default HomePageBG;

function ScaleImage({
  artWorkScaleImageRef,
}: {
  artWorkScaleImageRef: MutableRefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      style={{
        overflow: "hidden",
      }}
      className="w-[25vw] h-[35vw] ms-[20vw]"
      ref={artWorkScaleImageRef}
    >
      <Image
        src={bg}
        alt="Art female face"
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </div>
  );
}

// function ParallaxImage({
//   artWorkParallaxImageRef,
// }: {
//   artWorkParallaxImageRef: MutableRefObject<HTMLDivElement | null>;
// }) {
//   return (
//     <div
//       className="absolute right-0 top-0 me-[10vw]"
//       ref={artWorkParallaxImageRef}
//     >
//       <div className="w-[30vw] relative aspect-[1/1]">
//         <Image src={bg2} alt="" className="w-full" fill />
//       </div>
//     </div>
//   );
// }

function SplitText({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        "uppercase text-[9.896vw] leading-none font-normal",
        className
      )}
      style={{
        fontFamily: "SaolDisplay",
      }}
    >
      {children}
    </div>
  );
}

function ImageOverlay() {
  return (
    <div className="art_overlay w-full bg-gradient-to-t from-[#212220] via-[#212220]/50 to-transparent h-3/4 absolute bottom-0 opacity-0"></div>
  );
}
