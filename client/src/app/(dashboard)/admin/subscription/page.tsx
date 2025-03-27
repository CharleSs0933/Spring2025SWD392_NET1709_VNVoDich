"use client";
import CustomInput from "@/components/nondashboard/CustomInput";
import CustomTable from "@/components/nondashboard/CustomTable";
import { useGetSubscriptionQuery } from "@/state/apiAuth";
import { Subscription } from "@/types";
import React, { useEffect, useState } from "react";

const SubscriptionManagement = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<{
    id: number;
    tutor_id: number;
    plan_name: string;
    price: number;
    status: string;
    current_period_end: string;
    current_period_start: string;
  } | null>(null);

  const {
    data: Subscriptions,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery({});
  //   const [createSubscription] = useCreateSubscriptionMutation();
  //   const [updateSubscription] = useUpdateSubscriptionMutation();
  //   const [deleteSubscription] = useDeleteSubscriptionMutation();

  console.log(Subscriptions);

  const [SubscriptionsList, setSubscriptionsList] = useState<
    {
      id: number;
      tutor_id: number;
      status: string;
      price: number;
      plan_name: string;
      current_period_end: string;
      current_period_start: string;
    }[]
  >([]);

  useEffect(() => {
    if (Subscriptions) {
      const parseDate = (isoString: any) => {
        return new Date(isoString).toLocaleDateString("en-US");
      };

      const transformedSubscription = (Subscriptions as Subscription[]).map(
        (sub) => ({
          id: sub.id || 0,
          tutor_id: sub.tutor_id || 0,
          plan_name: sub.plan_name || "unknown",
          status: sub.status || "unknown",
          price: sub.price || 0,
          current_period_start: sub.current_period_start
            ? parseDate(sub.current_period_start)
            : "unknown",
          current_period_end: sub.current_period_end
            ? parseDate(sub.current_period_end)
            : "unknown",
        })
      );
      setSubscriptionsList(transformedSubscription);
    }
  }, [Subscriptions]);

  const handleDelete = async (id: number) => {
    try {
      //   await deleteSubscription({ id }).unwrap();
      //   setSubscriptionsList(prev => prev.filter(sub => sub.id !== id));
      alert(id);
    } catch (error) {
      console.log("Failed to delete Subscription:", error);
    }
  };

  const handleUpdate = (id: number) => {
    const SubscriptionToUpdate = SubscriptionsList.find((sub) => sub.id === id);
    if (SubscriptionToUpdate) {
      setSelectedSubscription(SubscriptionToUpdate);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async (data: Record<string, string | boolean>) => {
    try {
      if (isUpdate) {
        // await updateSubscription({
        //   id: selectedSubscription.id,
        //   name: data.name,
        //   price: data.price,
        //   duration: data.duration,
        // }).unwrap();

        setIsUpdate(false);
        setSelectedSubscription(null);
      } else {
        // await createSubscription({
        //   name: data.name,
        //   price: data.price,
        //   duration: data.duration,
        // }).unwrap();

        setIsCreate(false);
      }
      refetch();
    } catch (error) {
      console.log("Failed to update Subscription:", error);
    }
  };

  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <div className="p-6 bg-customgreys-secondarybg min-h-screen">
      <div className="bg-white  rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white-50 mb-2">
          Subscription Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your service Subscriptions efficiently.
        </p>

        {(isUpdate && selectedSubscription) || isCreate ? (
          <div className="mb-6 bg-customgreys-secondarybg  p-5 rounded-lg">
            <CustomInput
              fields={[
                { name: "plan_name", type: "text" },
                { name: "price", type: "text" },
                {
                  name: "status",
                  type: "switch",
                },
              ]}
              title={
                isUpdate
                  ? `Update Subscription: ${selectedSubscription?.id}`
                  : "Create New Subscription"
              }
              typeSubmit={isUpdate ? "Update" : "Create"}
              onSubmit={handleSubmit}
              defaultValues={
                isUpdate
                  ? {
                      plan_name: selectedSubscription?.plan_name,
                      price: selectedSubscription?.price.toString(),
                      status: selectedSubscription?.status,
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
          <p className="text-black">Loading Subscriptions...</p>
        ) : (
          <div className="bg-customgreys-secondarybg  rounded-lg overflow-hidden">
            <CustomTable
              data={SubscriptionsList}
              columns={[
                { key: "tutor_id", label: "Tutor Id" },
                { key: "plan_name", label: "Subscription Name" },
                { key: "price", label: "Price" },
                { key: "status", label: "status" },
                { key: "current_period_start", label: "Sub Start" },
                { key: "current_period_end", label: "Sub End" },
              ]}
              // onDelete={handleDelete}
              // onUpdate={handleUpdate}
              // onCreate={handleCreate}
              ITEMS_PER_PAGE={6}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
