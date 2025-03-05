"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useGetTutorQuery } from "@/state/api";
import Cookies from "js-cookie";
import UserDetailCard from "@/components/UserDetailCard"; // Import component

const Profile = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  const userId = user.ID;
  const userRole = user.role;
  const {
    data: tutor,
    isLoading,
    isError,
  } = useGetTutorQuery(userId as string);

  console.log(tutor);
  console.log(userId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-screen">
      <div className="col-span-2 flex flex-col gap-6">
        {/* Card Info */}
        <Card className="p-4 lg:h-64 md:h-60 sm: h-56 relative flex flex-col bg-[#352F44] border-none shadow-lg">
          <CardHeader className="relative w-full bg-gradient-to-r from-[#FAF0E6] to-[#60567a] rounded-xl flex flex-1 items-end"></CardHeader>
          <CardContent className="p-0 relative flex flex-1">
            <div className="rounded-xl w-11/12 p-4 bg-white/30 backdrop-blur-3xl shadow-md absolute -top-14 left-1/2 -translate-x-1/2 flex justify-start items-center gap-6">
              <div className="w-24 h-24 aspect-square rounded-xl flex items-center justify-center text-6xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                {tutor?.profile?.username.charAt(0)}
              </div>
              <div className="flex flex-col justify-between items-start gap-3">
                <h2 className="text-2xl font-bold text-primary-50">
                  {tutor?.profile?.username}
                </h2>
                <p className="text-primary-500">{tutor?.profile?.full_name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        {tutor?.profile && (
          <UserDetailCard profile={tutor.profile} role={userRole} />
        )}
      </div>

      <div className="flex flex-col gap-6"></div>
    </div>
  );
};

export default Profile;
