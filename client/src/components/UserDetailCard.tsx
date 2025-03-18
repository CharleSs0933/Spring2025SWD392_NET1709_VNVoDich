"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ParentFormData } from "@/lib/schemas";
import { User, UserCircle2, AtSign, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface UserDetailCardProps {
  submit: () => void;
  infoData: ParentFormData;
  setFormData: (data: ParentFormData) => void;
}

const UserDetailCard = ({
  submit,
  infoData,
  setFormData,
}: UserDetailCardProps) => {
  const [data, setData] = useState(infoData);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(data);
    setHasChanges(
      Object.keys(data).some(
        (key) =>
          data[key as keyof ParentFormData] !==
          infoData[key as keyof ParentFormData]
      )
    );
  }, [data, infoData, setFormData]);

  const handleChange = (field: keyof ParentFormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-[#352F44] border-none shadow-lg">
      <CardHeader>
        <span className="text-base font-bold text-primary-400">
          More Details
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <User size={22} />
          <Input value={data.username} disabled className="fieldProfile" />
        </div>
        <div className="flex items-center gap-2">
          <AtSign size={22} />
          <Input value={data.email} disabled className="fieldProfile" />
        </div>
        <div className="flex items-center gap-2">
          <UserCircle2 size={22} />
          <Input
            value={data.full_name}
            onChange={(e) => handleChange("full_name", e.target.value)}
            className="fieldProfile"
          />
        </div>
        <div className="flex items-center gap-2">
          <Phone size={22} />
          <Input
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="fieldProfile"
          />
        </div>
        {hasChanges && (
          <div className="flex justify-end mt-4">
            <Button onClick={submit} variant="default">
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;
