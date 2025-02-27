import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { bookingSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import ChildrenCard from "./children-card";
import { Children } from "@/types";

const ChildrenSelector = ({
  availableChildren,
  selectedChild,
  setSelectedChild,
}: {
  availableChildren: Children[];
  selectedChild: Children | null;
  setSelectedChild: (child: Children) => void;
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });
  const selectedChildId = watch("childId");

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Select a Child for Booking</h3>
      <div className="mb-4">
        <h4 className="font-medium mb-2">Available Children</h4>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
          {availableChildren.map((child) => (
            <ChildrenCard
              children={child}
              key={child.id}
              selectedChild={selectedChild}
              setSelectedChild={setSelectedChild}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChildrenSelector;
