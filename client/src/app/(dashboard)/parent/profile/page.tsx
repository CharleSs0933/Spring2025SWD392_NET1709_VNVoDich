"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { AtSign, Calendar, User, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetChildrenQuery, useGetParentByIdQuery } from "@/state/api";
import Loading from "@/components/Loading";
import { Children } from "@/types";
import Cookies from "js-cookie";

const Profile = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  const userId = user.ID;
  const { data: parent } = useGetParentByIdQuery({ userId });
  console.log(user);
  console.log(parent);
  const statistics = [
    {
      icon: <User className="text-blue-500 text-2xl" />,
      label: "Children",
      value: 2,
    },
    {
      icon: <User className="text-yellow-500 text-2xl" />,
      label: "Tutor Reviews",
      value: 2,
    },
    {
      icon: <User className="text-green-500 text-2xl" />,
      label: "Course Reviews",
      value: 2,
    },
  ];
  const router = useRouter();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  const handleViewChildSchedule = (child: Children) => {
    router.push(`/parent/children/${child.id}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 h-screen">
      <div className="col-span-2 flex flex-col gap-6">
        {/* Card Info */}
        <Card className="p-4 lg:h-64 md:h-60 sm: h-56 relative flex flex-col bg-[#352F44] border-none shadow-lg">
          <CardHeader
            className="relative w-full bg-gradient-to-r from-[#FAF0E6] to-[#60567a]
          rounded-xl flex flex-1 items-end"
          ></CardHeader>
          <CardContent className="p-0 relative flex flex-1">
            <div
              className="rounded-xl w-11/12 p-4 bg-white/30 backdrop-blur-3xl shadow-md
            absolute -top-14 left-1/2 -translate-x-1/2 flex justify-start items-center gap-6"
            >
              <div
                className="w-24 h-24 aspect-square rounded-xl flex items-center justify-center
            text-6xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
              >
                {user.username.charAt(0)}
              </div>
              <div className="flex flex-col justify-between items-start gap-3">
                <h2 className="text-2xl font-bold text-primary-50">
                  {user.username}
                </h2>
                <p className="text-primary-500">{} #fullname</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detail Card */}
        <Card className=" bg-[#352F44] border-none shadow-lg">
          <CardHeader>
            <span className="text-xl font-bold text-primary-400">
              More Details
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <section className="flex items-center gap-4">
              <User size={28} />
              <div className="flex flex-col items-start gap-2">
                <strong className="text-lg">Username:</strong>
                <span className="text-primary-750 text-md">username</span>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <UserCircle2 size={28} />
              <div className="flex flex-col items-start gap-2">
                <strong className="text-lg">Email:</strong>
                <span className="text-primary-750 text-md">user@gmail.com</span>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <AtSign size={28} />
              <div className="flex flex-col items-start gap-2">
                <strong className="text-lg">Email:</strong>
                <span className="text-primary-750 text-md">user@gmail.com</span>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <AtSign size={28} />
              <div className="flex flex-col items-start gap-2">
                <strong className="text-lg">Phone:</strong>
                <span className="text-primary-750 text-md">user@gmail.com</span>
              </div>
            </section>
            <section className="flex items-center gap-4">
              <Calendar size={28} />
              <div className="flex flex-col items-start gap-2">
                <strong className="text-lg">Date of birth:</strong>
                <span className="text-primary-750 text-md">22/02/2022</span>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-6">
        {/* Children */}
        <Card>
          <CardHeader>
            {" "}
            <span className="text-xl font-bold text-primary-400">Children</span>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loading />
            ) : isError || !children ? (
              <div>Error loading children.</div>
            ) : (
              children.map((child) => (
                <div
                  key={child.id}
                  className="flex items-center justify-between gap-5 py-2"
                >
                  <div
                    className="size-12 aspect-square rounded-full flex items-center justify-center 
          text-2xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md"
                  >
                    {child.full_name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{child.full_name}</p>
                    <p className="text-sm text-gray-500">
                      {child.learning_goals}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewChildSchedule(child)}
                  >
                    Details
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-none">
          <CardHeader>
            <span className="text-xl font-bold text-primary-400">
              Statistics
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-[#5C5470] p-4 rounded-xl shadow-sm"
                >
                  <div className="p-2 bg-[#DBD8E3] rounded-full shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white-50 text-base">{item.label}</p>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
