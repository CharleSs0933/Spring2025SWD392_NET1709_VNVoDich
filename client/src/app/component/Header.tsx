"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/asset/logo.jpg";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import {
  BookOpen,

  User,
} from "lucide-react";
import Link from "next/link";

const Header = () => {
  const { logout, user } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  const token = Cookies.get("authToken");

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
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

  const navLinks = {
    Parent: [{ icon: BookOpen, label: "DashBoard", href: "/parent/children" }],
    Tutor: [
      { icon: User, label: "DashBoard", href: "/tutor/courses" },
      { icon: User, label: "Package", href: "/package" },
    ],
    Admin: [{ icon: BookOpen, label: "DashBoard", href: "/admin/users" }],
  };

  const currentNavLinks = role ? navLinks[role as keyof typeof navLinks] : [];

  return (
    <div className="mx-16">
      <div className="absolute top-0 left-0 w-full py-3 bg-opacity-70 bg-black text-white z-10 flex justify-between items-center">
        <Link href='/' prefetch={true}
          
          className="ml-16 cursor-pointer"
        >
          <Image src={logo} alt="logo" width={150} height={200} />
        </Link>
        <div className="flex gap-8 items-center mr-16">
          {currentNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white font-semibold text-white-100 text-xl"
            >
              <span>{link.label}</span>
            </Link>
          ))}
          <Link href='/courses' prefetch={true}
            className="cursor-pointer font-semibold text-white-100 text-xl"
            
          >
            Courses
          </Link>
          {!token ? (
            <Link href='/login' prefetch={true}
              onClick={() => router.push("/login")}
              className="cursor-pointer font-semibold text-white-100 text-xl"
            >
              Login
            </Link>
          ) : (
            <button
              className="cursor-pointer font-semibold text-white-100 text-xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
