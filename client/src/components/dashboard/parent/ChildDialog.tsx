import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  formData: {
    full_name: string;
    password: string;
    age: number;
    grade_level: string;
    learning_goals: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleClose: () => void;
};

export const ChildDialog = ({
  formData,
  handleClose,
  handleChange,
  handleSubmit,
}: Props) => {
  return (
    <DialogContent className="p-6">
      <h2 className="text-lg font-semibold">Create Child Account</h2>
      <div className="grid gap-4">
        <Input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          name="age"
          type="number"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <Input
          name="grade_level"
          placeholder="Grade Level"
          value={formData.grade_level}
          onChange={handleChange}
        />
        <Input
          name="learning_goals"
          placeholder="Learning Goals"
          value={formData.learning_goals}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          <Button className="w-full border" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="w-full bg-primary-700" onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
