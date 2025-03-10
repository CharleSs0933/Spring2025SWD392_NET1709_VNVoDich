import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Children } from "@/types";
import React from "react";

const ChildrenCard = ({
  child,
  selectedChild,
  setSelectedChild,
}: {
  child: Children;
  selectedChild: Children | null; // Thay đổi type thành number | null để phù hợp với Redux
  setSelectedChild: (child: Children) => void;
}) => {
  return (
    <Card
      onClick={() => setSelectedChild(child)}
      className={`cursor-pointer ${
        selectedChild?.id === child.id ? "border-primary" : "border-none"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>{child.profile?.full_name}</Label>
        <Label>Date of Birth: {child.date_of_birth.split("T")[0]}</Label>
        <Label>{child.learning_goals}</Label>
      </CardContent>
    </Card>
  );
};

export default ChildrenCard;
