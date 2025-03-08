import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ParentFormData, parentSchema, TutorFormData } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserCircle2, AtSign, Phone } from "lucide-react";
import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomFormField } from "./CustomFormField";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { useUpdateParentMutation, useUpdateTutorMutation } from "@/state/api";
import { FieldConfig } from "@/types";

interface UserDetailCardProps<T extends "Parent" | "Tutor"> {
  info: T extends "Parent" ? ParentFormData : TutorFormData; // Dữ liệu dựa trên role
  fields: FieldConfig[];
  role: T;
}

const UserDetailCard = <T extends "Parent" | "Tutor">({
  info,
  fields,
  role,
}: UserDetailCardProps<T>) => {
  const [updateParent] = useUpdateParentMutation();
  const [updateTutor] = useUpdateTutorMutation();

  const methods = useForm<ParentFormData>({
    resolver: zodResolver(parentSchema),
    defaultValues: info,
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  const currentValues = watch(); // Theo dõi giá trị hiện tại của các field
  const hasChanges = Object.keys(currentValues).some(
    (key) =>
      currentValues[key as keyof ParentFormData] !==
      info[key as keyof ParentFormData]
  );

  const onSubmit = (data: ParentFormData) => {
    console.log("Updated Data:", data);
  };

  return (
    <div>
      <Card className="bg-[#352F44] border-none shadow-lg">
        <CardHeader>
          <span className="text-base font-bold text-primary-400 border-b-[1px] border-b-customgreys-dirtyGrey">
            More Details
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="detail_info "
            >
              {fields.map((field) => (
                <CustomFormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  initialValue={info[field.name] || ""}
                  disabled={field.disabled || false}
                  icon={field.icon}
                />
              ))}
              {hasChanges && (
                <div className="flex justify-end mt-4">
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              )}
              {/* <CustomFormField
                icon={<User size={26} />}
                name="username"
                label="Username"
                type="text"
                className="fieldProfile"
                initialValue={profile.username}
                disabled
              />
              <CustomFormField
                icon={<AtSign size={26} />}
                name="email"
                label="Email"
                type="text"
                className="fieldProfile"
                initialValue={profile.email}
                disabled
              />
              <CustomFormField
                icon={<UserCircle2 size={26} />}
                name="full_name"
                label="Full Name"
                type="text"
                className="fieldProfile"
                initialValue={profile.full_name}
              />

              <CustomFormField
                icon={<Phone size={26} />}
                name="phone"
                label="Phone Number"
                type="text"
                className="fieldProfile"
                initialValue={profile.phone}
              />
              {hasChanges && (
                <div className="flex justify-end mt-4">
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              )} */}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetailCard;
