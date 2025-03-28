"use client";
import Loading from "@/components/Loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AppSidebar from "@/components/AppSidebar";
import { useUser } from "@/hooks/useUser";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useUser();

  if (loading) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;

  return (
    <SidebarProvider>
      <div className=" min-h-screen w-full bg-customgreys-primarybg flex">
        <AppSidebar />
        <div className="flex flex-1 overflow-hidden">
          <div
            className={cn(
              "flex-grow min-h-screen transition-all duration-500 ease-in-out overflow-y-auto bg-customgreys-secondarybg"
            )}
            style={{ height: "100vh" }}
          >
            <Navbar />
            <main className="px-8 py-4">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
