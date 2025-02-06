import { Bell, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../asset/logo.jpg";

const NonDashboardNavbar = () => {
  return (
    <nav className=" box-border bg-gray-100 p-4">
      <div className="container flex flex-nowrap justify-start w-auto mx-20 px-6 items-center">
        <Image
          src={Logo}
          alt="LogoLMS"
          className="object-contain w-28 rounded-xl"
        />

        <div className="flex items-center mx-auto">
          <ul className="flex">
            <li className="py-4 pr-4 mr-3">Course</li>
            <li className="py-4 pr-4 mx-2">Course</li>
            <li className="py-4 ml-3">Course</li>
          </ul>
        </div>
        <div className="flex flex-nowrap">
          <div>Log in</div>
          <div>Start Trial</div>
        </div>
      </div>
    </nav>
  );
  // return (
  //   <nav className="w-full flex justify-center bg-customgreys-primarybg">
  //     <div className="flex justify-between items-center w-3/4 py-8">
  //       <div className="flex justify-between items-center gap-14">
  //         <Link
  //           href="/"
  //           className="font-bold text-lg sm:text-xl hover:text-customgreys-dirtyGrey"
  //         >
  //           Tutor Platform
  //         </Link>
  //         <div className="flex items-center gap-4">
  //           <div className="relative group">
  //             <Link
  //               href="/search"
  //               className="bg-customgreys-secondarybg pl-10 sm:pl-14 pr-6 sm:pr-20 py-3 sm:py-4 rounded-xl text-customgreys-dirtyGrey hover:text-white-50
  //               hover:bg-customgreys-darkerGrey transition-all duration-300 text-sm sm:text-base"
  //               scroll={false}
  //             >
  //               <span className="hidden sm:inline">Search Courses</span>
  //               <span className="sm:hidden">Search</span>
  //             </Link>
  //             <BookOpen
  //               className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-customgreys-dirtyGrey transition-all duration-300"
  //               size={18}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex items-center gap-2 sm:gap-4">
  //         <button className="relative w-7 h-7 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center">
  //           <span className="absolute top-0 right-0 bg-blue-500 h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full"></span>
  //           <Bell className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
  //         </button>

  //         {/* SIGN IN BUTTONS */}
  //         {/* <SignedIn>
  //           <UserButton
  //             appearance={{
  //               baseTheme: dark,
  //               elements: {
  //                 userButtonOuterIdentifier: "text-customgreys-dirtyGrey",
  //                 userButtonBox: "scale-90 sm:scale-100",
  //               },
  //             }}
  //             showName={true}
  //             userProfileMode="navigation"
  //             userProfileUrl={
  //               userRole === "teacher" ? "/teacher/profile" : "/user/profile"
  //             }
  //           />
  //         </SignedIn>
  //         <SignedOut> */}
  //         <Link
  //           href="/signin"
  //           className="text-customgreys-dirtyGrey hover:bg-customgreys-darkerGrey hover:text-white-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border-customgreys-dirtyGrey border-[1px] text-sm sm:text-base"
  //           scroll={false}
  //         >
  //           Log in
  //         </Link>
  //         <Link
  //           href="/signup"
  //           className="bg-indigo-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-primary-600 hover:text-customgreys-primarybg text-sm sm:text-base"
  //           scroll={false}
  //         >
  //           Sign up
  //         </Link>
  //         {/* </SignedOut> */}
  //       </div>
  //     </div>
  //   </nav>
  // );
};

export default NonDashboardNavbar;
