import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";

type Props = {
  formData: {
    full_name: string;
    password: string;
    age: number | string;
    grade_level: string;
    learning_goals: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleClose: () => void;
  mode: "create" | "edit";
};

export const ChildDialog = ({
  formData,
  handleClose,
  handleChange,
  handleSubmit,
  mode,
}: Props) => {
  const [errors, setErrors] = useState({
    full_name: "",
    password: "",
    age: "",
    grade_level: "",
    learning_goals: "",
  });

  const validateForm = () => {
    let newErrors = {
      full_name: "",
      password: "",
      age: "",
      grade_level: "",
      learning_goals: "",
    };
    let isValid = true;

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full Name is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 3) {
      newErrors.age = "Age must be a valid number and at least 3 years old";
      isValid = false;
    }

    if (!formData.grade_level.trim()) {
      newErrors.grade_level = "Grade Level is required";
      isValid = false;
    }

    if (!formData.learning_goals.trim()) {
      newErrors.learning_goals = "Learning Goals are required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  const handlerCloseDialong = () => {
    setErrors({
      full_name: "",
      password: "",
      age: "",
      grade_level: "",
      learning_goals: "",
    });
    handleClose();
  };

  return (
    <DialogContent className="dialog_content">
      <DialogTitle className="dialog_title text-lg font-semibold">
        {mode === "create" ? "Create Child Account" : "Edit Child Account"}
      </DialogTitle>
      <div className="grid gap-1">
        <div className="dialog_field">
          <label className="dialog_label" htmlFor="full_name">
            Full Name
          </label>
          <Input
            id="full_name"
            className="dialog_input"
            name="full_name"
            placeholder="Enter full name"
            value={formData.full_name}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm">{errors.full_name}</p>
        </div>

        <div className="dialog_field">
          <label className="dialog_label" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            className="dialog_input"
            name="password"
            type="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm ">{errors.password}</p>
        </div>

        <div className="dialog_field">
          <label className="dialog_label" htmlFor="age">
            Age
          </label>
          <Input
            id="age"
            className="dialog_input"
            name="age"
            type="number"
            placeholder="Enter age"
            value={formData.age}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm ">{errors.age}</p>
        </div>

        <div className="dialog_field">
          <label className="dialog_label" htmlFor="grade_level">
            Grade Level
          </label>
          <Input
            id="grade_level"
            className="dialog_input"
            name="grade_level"
            placeholder="Enter grade level"
            value={formData.grade_level}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm ">{errors.grade_level}</p>
        </div>

        <div className="dialog_field">
          <label className="dialog_label" htmlFor="learning_goals">
            Learning Goals
          </label>
          <Input
            id="learning_goals"
            className="dialog_input"
            name="learning_goals"
            placeholder="Enter learning goals"
            value={formData.learning_goals}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm ">{errors.learning_goals}</p>
        </div>

        {/* Buttons */}
        <div className="dialog_buttons">
          <Button
            className="dialog_button cancel"
            onClick={handlerCloseDialong}
          >
            Cancel
          </Button>
          <Button className="dialog_button confirm" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
