"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ParentFormData, parentSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserCircle2, AtSign, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomFormField } from "./CustomFormField";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
// import { useUpdateParentMutation, useUpdateTutorMutation } from "@/state/api";
// import { FieldConfig } from "@/types";

interface UserDetailCardProps {
  infoData: ParentFormData;
  role: "Parent" | "Tutor";
}

const UserDetailCard = ({ infoData, role }: UserDetailCardProps) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const methods = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      username: infoData?.username || "",
      full_name: infoData?.full_name || "",
      email: infoData?.email || "",
      phone: infoData?.phone || "",
    },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const currentValues = watch();

  const hasChanges = Object.keys(currentValues).some(
    (key) =>
      currentValues[key as keyof ParentFormData] !==
      infoData[key as keyof ParentFormData]
  );

  const onSubmit = (data: ParentFormData) => {
    console.log("Updated Data:", data);
    setIsEditing(null);
  };

  return (
    <Card className="bg-[#352F44] border-none shadow-lg">
      <CardHeader>
        <span className="text-base font-bold text-primary-400">
          More Details
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <Form {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="detail_info flex flex-col gap-4"
          >
            <CustomFormField
              icon={<User size={22} />}
              name="username"
              label="Username"
              type="text"
              className="fieldProfile"
              initialValue={infoData.username}
              disabled
            />
            <CustomFormField
              icon={<AtSign size={22} />}
              name="email"
              label="Email"
              type="text"
              className="fieldProfile"
              initialValue={infoData.email}
              disabled
            />
            <CustomFormField
              icon={<UserCircle2 size={22} />}
              name="full_name"
              label="Full Name"
              type="text"
              className="fieldProfile"
              initialValue={infoData.full_name}
            />
            <CustomFormField
              icon={<Phone size={22} />}
              name="phone"
              label="Phone Number"
              type="text"
              className="fieldProfile"
              initialValue={infoData.phone}
            />

            {hasChanges && (
              <div className="flex justify-end mt-4">
                <Button type="submit" variant="default">
                  Save
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;
