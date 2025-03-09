import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";

type Props = {
  formData: {
    full_name: string;
    username: string;
    password: string;
    date_of_birth: string;
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
    date_of_birth: "",
    learning_goals: "",
  });

  const validateForm = () => {
    let newErrors = {
      full_name: "",
      password: "",
      date_of_birth: "",
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
      date_of_birth: "",
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
          <label className="dialog_label" htmlFor="username">
            Username
          </label>
          <Input
            id="username"
            className="dialog_input"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            // disabled
          />
          {/* <p className="text-red-500 text-sm ">{errors.password}</p> */}
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
          <label className="dialog_label" htmlFor="date of birth">
            Date of Birth
          </label>
          <Input
            id="date of birth"
            className="dialog_input"
            name="date_of_birth"
            type="date"
            placeholder="Enter age"
            value={formData.date_of_birth.split("T")[0]}
            onChange={handleChange}
          />
          <p className="text-red-500 text-sm ">{errors.date_of_birth}</p>
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
