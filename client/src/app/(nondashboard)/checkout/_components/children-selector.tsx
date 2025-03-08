import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Children } from "@/types";
import React from "react";
import ChildrenCard from "./children-card";
import { useAppDispatch, useAppSelector } from "@/state/redux"; // Đảm bảo hook đúng với setup của bạn
import { useRouter } from "next/navigation";
import { setSelectedBookingChild } from "@/state";

const ChildrenSelector = ({
  availableChildren,
  courseId,
}: {
  availableChildren: Children[];
  courseId: string;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Lấy selectedChild từ Redux store
  const { selectedChild } = useAppSelector((state) => state.global.booking);

  const handleNextStep = () => {
    if (selectedChild !== null) {
      // Chuyển sang bước tiếp theo trong checkout flow
      router.push(`/checkout?step=3&id=${courseId}`);
    }
  };

  return (
    <div className="p-10 border bg-customgreys-primarybg">
      <h3 className="text-2xl font-bold mb-4">Select a Child for Booking</h3>
      <h4 className="font-medium mb-2">Available Children</h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {availableChildren.map((child) => (
          <ChildrenCard
            children={child}
            key={child.id}
            selectedChild={selectedChild}
            setSelectedChild={(child) =>
              dispatch(setSelectedBookingChild(child))
            } // Dispatch action Redux
          />
        ))}
      </div>
      <Button
        className="mt-4 text-gray-100 bg-primary-700 hover:bg-primary-600"
        onClick={handleNextStep}
        disabled={selectedChild === null}
      >
        Next Step
      </Button>
    </div>
  );
};

export default ChildrenSelector;
