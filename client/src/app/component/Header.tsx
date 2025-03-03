"use client";
import Cookies from "js-cookie";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../asset/img/logo.png";
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
      if (parsedUser.role === "Admin" || parsedUser.role === "Parent") {
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
      <div className="absolute top-0 left-0 w-full   bg-opacity-70 bg-black text-white z-10 flex justify-between items-center  ">
        <div onClick={() => router.push("/")} className="ml-16 cursor-pointer">
          <Image src={logo} alt="logo" width={150} height={200} />
        </div>
        <div className="flex gap-16 text-xl items-center mr-16">
          <div
            onClick={() => router.push("/Courses")}
            className="cursor-pointer"
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

          {!token ? (
            <div
              onClick={() => router.push("/login")}
              className="bg-white-100 p-1 rounded-lg text-black font-semibold cursor-pointer"
            >
              Login Now
            </div>
          ) : (
            <div
              className="bg-white-100 p-1 rounded-lg text-black font-semibold cursor-pointer"
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
