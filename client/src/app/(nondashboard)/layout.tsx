"use client";
import Loading from "@/components/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import ChaptersSidebar from "./user/courses/[courseId]/ChaptersSidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NonDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <div>
      <Header />
      <main className={`${isHomepage ? "" : "flex-1 pt-[4%]"}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
