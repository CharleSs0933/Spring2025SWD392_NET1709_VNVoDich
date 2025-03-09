"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  useGetChildrenQuery,
  useGetParentByIdQuery,
  useUpdateParentMutation,
} from "@/state/api";
import Loading from "@/components/Loading";
import { Children, FieldConfig } from "@/types";
import Cookies from "js-cookie";
import UserDetailCard from "@/components/UserDetailCard"; // Import component
import Header from "@/components/Header";
import { createParentFormData } from "@/lib/utils";
import { ParentFormData } from "@/lib/schemas";
import { AtSign, Phone, User, UserCircle2 } from "lucide-react";

const parentFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    icon: <User size={22} />,
    disabled: true,
  },
  { name: "email", label: "Email", icon: <AtSign size={22} />, disabled: true },
  { name: "full_name", label: "Full name", icon: <UserCircle2 size={22} /> },
  { name: "phone", label: "Phone number", icon: <Phone size={22} /> },
];

const Profile = () => {
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null;
  const userId = user.ID;
  const userRole = user.role;
  const {
    data: parent,
    isLoading,
    isError,
    refetch,
  } = useGetParentByIdQuery({ userId });
  const [updateParent] = useUpdateParentMutation();

  const router = useRouter();

  const handleUpdate = async (data: ParentFormData) => {
    try {
      const formData = createParentFormData({
        ...data,
      });
      await updateParent({
        parentId: userId,
        formData,
      }).unwrap();
      refetch();
    } catch (err) {
      console.error(err, "Error updating user");
    }
  };

  const handleViewChildSchedule = (child: Children) => {
    router.push(`/parent/children/${child.id}`);
  };
  console.log(parent);
  console.log(parent);

  return (
    <div>
      <Header title="Profile" subtitle="Information in detail" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          {/* Card Info */}
          <Card className="p-4 lg:h-64 md:h-60 sm: h-56 relative flex flex-col bg-[#352F44] border-none shadow-lg">
            <CardHeader className="relative w-full bg-gradient-to-r from-[#FAF0E6] to-[#60567a] rounded-xl flex flex-1 items-end"></CardHeader>
            <CardContent className="p-0 relative flex flex-1">
              <div className="rounded-xl w-11/12 p-4 bg-white/30 backdrop-blur-3xl shadow-md absolute -top-14 left-1/2 -translate-x-1/2 flex justify-start items-center gap-6">
                <div className="w-24 h-24 aspect-square rounded-xl flex items-center justify-center text-6xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
                  {parent?.profile?.username.charAt(0)}
                </div>
                <div className="flex flex-col justify-between items-start gap-3">
                  <h2 className="text-3xl font-bold text-primary-50">
                    {parent?.profile?.username}
                  </h2>
                  <p className="text-primary-500">
                    {parent?.profile?.full_name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Children */}
          {userRole === "Parent" && (
            <Card>
              <CardHeader>
                <span className="text-xl font-bold text-primary-400">
                  Children
                </span>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Loading />
                ) : isError || !parent?.childrens ? (
                  <div>Error loading children.</div>
                ) : !parent?.childrens ? (
                  <div>No children</div>
                ) : (
                  parent.childrens.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center justify-between gap-5 py-2"
                    >
                      <div className="size-12 aspect-square rounded-full flex items-center justify-center text-2xl font-bold uppercase text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
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
          )}
        </div>

        <div className="flex flex-col gap-6">
          {/* User Details */}
          {parent && (
            <UserDetailCard
              // handleSubmit={handleUpdate}
              fields={parentFields}
              info={parent}
              role={userRole}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
