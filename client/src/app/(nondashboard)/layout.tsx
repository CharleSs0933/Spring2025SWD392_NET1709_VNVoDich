"use client";
import Loading from "@/components/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default function NonDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <main className={`${isHomepage ? "" : "flex-1 pt-[5%]"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
