"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/asset/logo.jpg";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const Header = () => {
  const { logout } = useUser();
  const [role, setRole] = useState<string | null>(null);

  const token = Cookies.get("authToken");
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Convert string to object
      console.log(parsedUser.role);
      if (
        parsedUser.role === "Admin" ||
        parsedUser.role === "Parent" ||
        parsedUser.role === "Tutor"
      ) {
        setRole(parsedUser.role);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setRole(null);
  };
  const router = useRouter();
  return (
    <div className="mx-16">
      <div className="absolute top-0 left-0 w-full py-3  bg-opacity-70 bg-black text-white z-10 flex justify-between items-center  ">
        <div onClick={() => router.push("/")} className=" ml-16 cursor-pointer invisible md:visible   ">
          <Image src={logo} alt="logo" width={150} height={200}  />
        </div>
        <div className="sm:text-sm md:text-lg lg:text-2xl flex gap-16  items-center mr-16">
          <div
            onClick={() => router.push("/courses")}
            className="font-semibold cursor-pointer"
          >
            Courses
          </div>
          {/*         
          <div className="cursor-pointer">Teams</div>
          <div className="cursor-pointer">Commuity</div> */}
          {role === "Admin" && (
            <div
              onClick={() => router.push("/admin")}
              className="bg-white p-1 rounded-lg text-white-50 cursor-pointer"
            >
              Admin Dashboard
            </div>
          )}

          {role === "Parent" && (
            <div
              onClick={() => router.push("/parent/children")}
              className="bg-white p-1 rounded-lg text-white-50 cursor-pointer"
            >
              Parent Dashboard
            </div>
          )}

          {role === "Tutor" && (
            <div
              onClick={() => router.push("/tutor/courses")}
              className="bg-white p-1 rounded-lg text-white-50 cursor-pointer"
            >
              Tutor Dashboard
            </div>
          )}

          {!token ? (
            <div
              onClick={() => router.push("/login")}
              className=" font-semibold cursor-pointer"
            >
              Login
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
