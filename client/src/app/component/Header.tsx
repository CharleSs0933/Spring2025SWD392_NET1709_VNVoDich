"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React from "react";
import logo from "../../asset/logo.jpg";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
const Header = () => {
  const token = Cookies.get("authToken");
  const { logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };
  const router = useRouter();
  return (
    <div className="mx-16">
      <div className="absolute top-0 left-0 w-full py-3  bg-opacity-70 bg-black text-white z-10 flex justify-between items-center  ">
        <div onClick={() => router.push("/")} className="ml-16 cursor-pointer">
          <Image src={logo} alt="logo" width={150} height={200} />
        </div>
        <div className="flex gap-16 text-xl items-center mr-16">
          <div
            onClick={() => router.push("/courses")}
            className="font-semibold cursor-pointer"
          >
            Courses
          </div>
{/*         
          <div className="cursor-pointer">Teams</div>
          <div className="cursor-pointer">Commuity</div> */}
          <div
            onClick={() => router.push("/courses")}
            className=" font-semibold cursor-pointer"
          > 
            DoashBoard
          </div>
          <div
            onClick={() => router.push("/package")}
            className=" font-semibold cursor-pointer"
          > 
            Package
          </div>
          {!token ? (
            <div
              onClick={() => router.push("/login")}
              className=" font-semibold cursor-pointer"
            >
              Login Now
            </div>
          ) : (
            <div
              className=" font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
