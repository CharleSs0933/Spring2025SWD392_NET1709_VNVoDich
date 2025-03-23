"use client";
import CustomInput from "@/components/nondashboard/CustomInput";
import CustomTable from "@/components/nondashboard/CustomTable";
import {
  useGetRefundStatisticsQuery,
  useUpdateStatusRefundRequestMutation,
} from "@/state/apiAuth";

import { RefundRequest } from "@/types";
import React, { useEffect, useState } from "react";

const RequestManagement = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<{
    id: number;
    user_id: number;
    username: string;
    email: string;
    amount: number;
    card_number: string;
    reason: string;
    admin_note: string;
    status: string;
  } | null>(null);

  const {
    data: Requests,
    isLoading,
    refetch,
  } = useGetRefundStatisticsQuery({});

  const [updateStatusRequest] = useUpdateStatusRefundRequestMutation();

  const [requestList, setrequestList] = useState<
    {
      id: number;
      user_id: number;
      username: string;
      email: string;
      amount: number;
      card_number: string;
      reason: string;
      admin_note: string;
      status: string;
      order_id: string;
    }[]
  >([]);

  useEffect(() => {
    if (Requests) {
      const transformedRequest = (
        (Requests as any).recent_refunds as RefundRequest[]
      ).map((req) => ({
        id: req.ID || 0,
        user_id: req.user_id,
        username: req.username || "unknown",
        email: req.email || "unknown",
        card_number: String(req.card_number) || "unknown",
        reason: req.reason || "unknown",
        admin_note: req.admin_note || "unknown",
        status: req.status || "unknown",
        amount: req.amount | 0,
        order_id: req.order_id || "",
      }));
      setrequestList(transformedRequest);
    }
  }, [Requests]);

  const handleUpdate = (id: number) => {
    const RequestToUpdate = requestList.find((req) => req.id === id);
    if (RequestToUpdate) {
      setSelectedRequest(RequestToUpdate);

      setIsUpdate(true);
    }
  };

  const handleSubmit = async (data: Record<string, string | boolean>) => {
    try {
      if (isUpdate) {
        await updateStatusRequest({
          id: Number(selectedRequest?.id),
          status: String(data.status),
          admin_note: String(data.admin_note),
        }).unwrap();

        setIsUpdate(false);
        setSelectedRequest(null);
      } else {
        console.log(data);
        setIsCreate(false);
      }
      refetch();
    } catch (error) {
      console.error("Failed to update Request:", error);
    }
  };

  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <div className="p-6 bg-customgreys-secondarybg min-h-screen">
      <div className="bg-white  rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white-100 mb-2">
          Request Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your service request efficiently.
        </p>

        {(isUpdate && selectedRequest) || isCreate ? (
          <div className="mb-6 bg-customgreys-secondarybg  p-5 rounded-lg">
            <CustomInput
              fields={[
                {
                  name: "status",
                  type: "select",
                  options: ["APPROVED", "REJECTED", "PENDING"],
                },
                { name: "admin_note", type: "text" },
              ]}
              title={
                isUpdate
                  ? `Update Request: ${selectedRequest?.username}`
                  : "Create New Request"
              }
              typeSubmit={isUpdate ? "Update" : "Create"}
              onSubmit={handleSubmit}
              defaultValues={
                isUpdate
                  ? {
                      status: "pending",
                      admin_note: selectedRequest?.admin_note,
                    }
                  : {}
              }
            />
            <button
              onClick={() =>
                isUpdate ? setIsUpdate(false) : setIsCreate(false)
              }
              className="mt-3 text-red-500 font-semibold underline"
            >
              Cancel
            </button>
          </div>
        ) : isLoading ? (
          <p className="text-black">Loading request...</p>
        ) : (
          <div className="bg-customgreys-secondarybg  rounded-lg overflow-hidden">
            <CustomTable
              data={requestList}
              columns={[
                { key: "user_id", label: "User Id" },
                { key: "username", label: "Username" },
                { key: "email", label: "Email" },
                { key: "order_id", label: "Order Id" },
                { key: "amount", label: "Amount" },
                { key: "card_number", label: "Card Number" },
                { key: "reason", label: "Reason" },
                { key: "admin_note", label: "Admin Note" },
                { key: "status", label: "Status" },
              ]}
              //   onDelete={handleDelete}
              onUpdate={handleUpdate}
              //   onCreate={handleCreate}
              ITEMS_PER_PAGE={6}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestManagement;
