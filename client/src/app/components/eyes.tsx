"use client";
import React, { useEffect } from "react";

const Eyes = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const eyes = document.querySelectorAll(".eye");

      eyes.forEach((eye) => {
        const eyeElement = eye as HTMLElement;
        const rect = eyeElement.getBoundingClientRect();

        const pupil = eyeElement.querySelector(".pupil") as HTMLElement;
        if (pupil) {
          const rectPupil = pupil.getBoundingClientRect();
          const pupilCenterX = rectPupil.left + rectPupil.width / 2;
          const pupilCenterY = rectPupil.top + rectPupil.height / 2;

          const angleX = (clientX - pupilCenterX) / 10;
          const angleY = (clientY - pupilCenterY) / 10;

          const maxX = (rect.width - rectPupil.width) / 2;
          const maxY = (rect.height - rectPupil.height) / 2;

          const clampedX = Math.max(-maxX, Math.min(maxX, angleX));
          const clampedY = Math.max(-maxY, Math.min(maxY, angleY));

          pupil.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center border rounded-full bg-white-50  shadow-xl py-3">
  <div className="flex">
    <div className="eye bg-white rounded-full border-4 border-black w-20 h-20 mb-9 flex justify-center items-center m-4 relative overflow-hidden">
      <div className="pupil bg-black rounded-full w-8 h-8 absolute"></div>
    </div>
    <div className="eye bg-white rounded-full border-4 border-black w-20 h-20 mb-9 flex justify-center items-center m-4 relative overflow-hidden">
      <div className="pupil bg-black rounded-full w-8 h-8 absolute"></div>
    </div>
  </div>
  <div className="flex justify-center items-center text-5xl font-bold z-10 mt-4 rotate-90 text-black">
    (
  </div>
</div>

  );
};

export default Eyes;
