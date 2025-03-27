"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ParentFormData } from "@/lib/schemas";
import { User, UserCircle2, AtSign, Phone, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Parent } from "@/types";

interface UserDetailCardProps {
  submit: () => void;
  infoData: Parent;
  setFormData: (data: ParentFormData) => void;
}

const UserDetailCard = ({
  submit,
  infoData,
  setFormData,
}: UserDetailCardProps) => {
  const [data, setData] = useState(infoData);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({
    date_of_birth: "",
    full_name: "",
    phone: "",
  });

  useEffect(() => {
    setData(infoData);
  }, [infoData]);

  useEffect(() => {
    setFormData({
      username: data.profile.username,
      full_name: data.profile.full_name,
      date_of_birth: data.date_of_birth,
      email: data.profile.email,
      phone: data.profile.phone,
    });
    setHasChanges(
      data.profile.full_name !== infoData.profile.full_name ||
        data.profile.phone !== infoData.profile.phone ||
        data.date_of_birth !== infoData.date_of_birth
    );
  }, [data, infoData, setFormData]);

  const validateField = (field: keyof ParentFormData, value: string) => {
    let error = "";
    if (field === "full_name") {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (/[^a-zA-Z\s]/.test(value)) {
        error = "Full name must contain only letters and spaces";
      }
    }
    if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required";
      } else if (/[^0-9]/.test(value)) {
        error = "Phone number must contain only digits";
      } else if (!/^\d{10,15}$/.test(value)) {
        error = "Phone number must be 10-15 digits";
      } else {
        // Valid Vietnamese mobile
        const validPrefixes = [
          "032",
          "033",
          "034",
          "035",
          "036",
          "037",
          "038",
          "039", // Viettel
          "070",
          "076",
          "077",
          "078",
          "079", // MobiFone
          "081",
          "082",
          "083",
          "084",
          "085",
          "088", // Vinaphone
          "086", // Viettel
          "089", // MobiFone
          "090",
          "093", // MobiFone
          "091",
          "094", // Vinaphone
          "092", // Vietnamobile
          "096",
          "097",
          "098", // Viettel
          "099", // Gmobile
        ];
        const prefix = value.slice(0, 3);
        if (!validPrefixes.includes(prefix)) {
          error = "Invalid phone number prefix";
        }
      }
    }
    if (field === "date_of_birth") {
      const date = new Date(value);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(today.getFullYear() - 120);

      if (isNaN(date.getTime())) {
        error = "Invalid date format";
      } else if (date > today) {
        error = "Date of birth cannot be in the future";
      } else if (date < minDate) {
        error = "Date of birth is too far in the past";
      }
    }
    return error;
  };

  const handleChange = (field: keyof ParentFormData, value: string) => {
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));

    if (field === "date_of_birth") {
      setData((prev) => ({ ...prev, [field]: value }));
    } else {
      setData((prev) => ({
        ...prev,
        profile: { ...prev.profile, [field]: value },
      }));
    }
  };

  const handleSubmit = () => {
    const fullNameError = validateField("full_name", data.profile.full_name);
    const phoneError = validateField("phone", data.profile.phone);
    const dateOfBirthError = validateField("date_of_birth", data.date_of_birth);
    if (
      (fullNameError.length > 0 || phoneError.length > 0,
      dateOfBirthError.length > 0)
    ) {
      setErrors({
        date_of_birth: dateOfBirthError,
        full_name: fullNameError,
        phone: phoneError,
      });
    }

    if (!fullNameError && !phoneError && !dateOfBirthError && hasChanges) {
      submit();
    }
  };

  return (
    <Card className="bg-[#352F44] border-none shadow-lg">
      <CardHeader>
        <span className="text-base font-bold text-primary-400">
          More Details
        </span>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-end gap-3">
            <User size={22} />
            <span className="font-bold">Username</span>
          </div>
          <Input
            value={data.profile.username}
            disabled
            className="fieldProfile"
          />
        </div>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-end gap-3">
            <AtSign size={22} />
            <span className="font-bold">Email</span>
          </div>
          <Input value={data.profile.email} disabled className="fieldProfile" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-end gap-3">
              <UserCircle2 size={22} />
              <span className="font-bold">Full name</span>
            </div>
            <Input
              value={data.profile.full_name || ""}
              onChange={(e) => handleChange("full_name", e.target.value)}
              className="fieldProfile"
            />
          </div>
          {errors.full_name && (
            <span className="text-red-500 text-sm">{errors.full_name}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-end gap-3">
              <Phone size={22} />
              <span className="font-bold">Phone</span>
            </div>
            <Input
              value={data.profile.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="fieldProfile"
            />
          </div>
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 justify-between">
            <div className="flex items-end gap-3">
              <Calendar size={22} />
              <span className="font-bold">Date of birth</span>
            </div>
            <Input
              value={data.date_of_birth?.split("T")[0]}
              type="date"
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              className="fieldProfile"
            />
          </div>
          {errors.date_of_birth && (
            <span className="text-red-500 text-sm">{errors.date_of_birth}</span>
          )}
        </div>
        {hasChanges && (
          <div className="flex justify-end mt-4">
            <Button onClick={handleSubmit} variant="default">
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetailCard;
