import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Children } from "@/types";
import React from "react";

const ChildrenCard = ({
  children,
  selectedChild,
  setSelectedChild,
}: {
  children: Children;
  selectedChild: Children | null; // Thay đổi type thành number | null để phù hợp với Redux
  setSelectedChild: (child: Children) => void;
}) => {
  return (
    <Card
      onClick={() => setSelectedChild(children)}
      className={`cursor-pointer ${
        selectedChild?.id === children.id ? "border-primary" : "border-none"
      }`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>{children.full_name}</Label>
        <Label>Age: {children.age}</Label>
        <Label>{children.grade_level}</Label>
      </CardContent>
    </Card>
  );
};

export default ChildrenCard;
