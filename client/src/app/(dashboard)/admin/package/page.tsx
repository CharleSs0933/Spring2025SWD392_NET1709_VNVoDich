"use client";
import CustomInput from "@/components/nondashboard/CustomInput";
import CustomTable from "@/components/nondashboard/CustomTable";
import {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetPackageQuery,
  useUpdatePackageMutation,
} from "@/state/apiAuth";
import { Package } from "@/types";
import React, { useEffect, useState } from "react";

const PackageManagement = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: number;
    name: string;
    price_monthly: number;
    price_annually: number;
    max_courses: number;
    description: string;
    is_active: boolean;
  } | null>(null);

  const { data: packages, isLoading, refetch } = useGetPackageQuery({});
  const [createPackage] = useCreatePackageMutation();
  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const [packagesList, setPackagesList] = useState<
    {
      id: number;
      name: string;
      price_annually: number;
      price_monthly: number;
      max_courses: number;
      description: string;
      is_active: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (packages) {
      const transformedPackage = (packages as Package[]).map((pkg) => ({
        id: pkg.ID || 0,
        name: pkg.name || "unknown",
        price_annually: pkg.price_annually | 0,
        price_monthly: pkg.price_monthly | 0,
        is_active: pkg.is_active || false,
        max_courses: pkg.max_courses | 0,
        description: pkg.description || "unknown",
      }));
      setPackagesList(transformedPackage);
    }
  }, [packages]);

  const handleDelete = async (id: number) => {
    try {
      setPackagesList((prev) => prev.filter((pkg) => pkg.id !== id));
      await deletePackage({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete package:", error);
    }
  };

  const handleUpdate = (id: number) => {
    const packageToUpdate = packagesList.find((pkg) => pkg.id === id);
    if (packageToUpdate) {
      setSelectedPackage(packageToUpdate);
      setIsUpdate(true);
    }
  };

  const handleSubmit = async (data: Record<string, string | boolean>) => {
    try {
      if (isUpdate) {
        await updatePackage({
          id: Number(selectedPackage?.id),
          name: String(data.name),
          price_monthly: Number(data.price_monthly),
          price_annually: Number(data.price_annually),
          max_courses: Number(data.max_courses),
          is_active: Boolean(data.is_active),
          description: String(data.description),
        }).unwrap();

        setIsUpdate(false);
        setSelectedPackage(null);
      } else {
        await createPackage({
          name: String(data.name),
          price_monthly: Number(data.price_monthly),
          price_annually: Number(data.price_annually),
          max_courses: Number(data.max_courses),
          is_active: Boolean(data.is_active),
          description: String(data.description),
        }).unwrap();

        setIsCreate(false);
      }
      refetch();
    } catch (error) {
      console.error("Failed to update package:", error);
    }
  };

  const handleCreate = () => {
    setIsCreate(true);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-black mb-2">
          Package Management
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your service packages efficiently.
        </p>

        {(isUpdate && selectedPackage) || isCreate ? (
          <div className="mb-6 bg-gray-50 shadow-md p-5 rounded-lg">
            <CustomInput
              fields={[
                { name: "name", type: "text" },
                { name: "price_annually", type: "text" },
                { name: "price_monthly", type: "text" },
                { name: "max_courses", type: "text" },
                { name: "description", type: "text" },
                { name: "is_active", type: "switch" },
              ]}
              title={
                isUpdate
                  ? `Update Package: ${selectedPackage?.name}`
                  : "Create New Package"
              }
              typeSubmit={isUpdate ? "Update" : "Create"}
              onSubmit={handleSubmit}
              defaultValues={
                isUpdate
                  ? {
                      name: selectedPackage?.name,
                      price_annually:
                        selectedPackage?.price_annually.toString(),
                      price_monthly: selectedPackage?.price_monthly.toString(),
                      description: selectedPackage?.description,
                      max_courses: selectedPackage?.max_courses.toString(),
                      is_active: selectedPackage?.is_active,
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
          <p className="text-black">Loading packages...</p>
        ) : (
          <div className="bg-white-100 shadow-md rounded-lg overflow-hidden">
            <CustomTable
              data={packagesList}
              columns={[
                { key: "name", label: "Package Name" },
                { key: "price_monthly", label: "Price Monthly" },
                { key: "price_annually", label: "Price Annually" },
                { key: "description", label: "description" },
                { key: "max_courses", label: "Amount Courses" },
                { key: "is_active", label: "Active" },
              ]}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onCreate={handleCreate}
              ITEMS_PER_PAGE={6}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageManagement;
