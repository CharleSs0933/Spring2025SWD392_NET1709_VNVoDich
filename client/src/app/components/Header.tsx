import Image from "next/image";
import React from "react";
import logo from "@/app/asset/img/logo.png";

const Header = () => {

  return (
    <div className="mx-16">
      <div className="absolute top-0 left-0 w-full   bg-opacity-70 bg-black text-white z-10 flex justify-between items-center  ">
        <div className="ml-16">
          <Image src={logo} alt="logo" width={150} height={200} />
        </div>
        <div className="flex gap-16 text-xl items-center mr-16">
          <div className="">Courses</div>
          <div>Membership</div>
          <div>Teams</div>
          <div>Commuity</div>
          <div className="bg-white-100 p-1 rounded-lg text-black font-semibold">
            Enroll Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
