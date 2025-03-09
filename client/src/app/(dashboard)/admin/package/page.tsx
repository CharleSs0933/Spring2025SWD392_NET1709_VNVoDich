"use client";
import CustomInput from "@/app/component/CustomInput";
import CustomTable from "@/app/component/CustomTable";
import { useGetPackageQuery } from "@/state/apiAuth";
import { Package } from "@/types";
import React, { useEffect, useState } from "react";
import { number } from "zod";

const PackageManagement = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<{
    id: number;
    name: string;
    price: number;
    description: string;
  } | null>(null);

  const { data: packages, isLoading, refetch } = useGetPackageQuery({});
  //   const [createPackage] = useCreatePackageMutation();
  //   const [updatePackage] = useUpdatePackageMutation();
  //   const [deletePackage] = useDeletePackageMutation();

  const [packagesList, setPackagesList] = useState<
    {
      id: number;
      name: string;
      price: number;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    if (packages) {
      const transformedPackage = (packages as Package[]).map((pkg) => ({
        id: pkg.ID || 0,
        name: pkg.name || "unknown",
        price: typeof pkg.price_monthly === "number" ? pkg.price_monthly : 0,
        description: pkg.description || "unknown",
      }));
      setPackagesList(transformedPackage);
    }
  }, [packages]);

  const handleDelete = async (id: number) => {
    try {
      //   await deletePackage({ id }).unwrap();
      //   setPackagesList(prev => prev.filter(pkg => pkg.id !== id));
      alert(id);
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

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      if (isUpdate) {
        // await updatePackage({
        //   id: selectedPackage.id,
        //   name: data.name,
        //   price: data.price,
        //   duration: data.duration,
        // }).unwrap();
        console.log(data);

        setIsUpdate(false);
        setSelectedPackage(null);
      } else {
        // await createPackage({
        //   name: data.name,
        //   price: data.price,
        //   duration: data.duration,
        // }).unwrap();
        console.log(data);

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
              fields={["name", "price", "duration"]}
              title={
                isUpdate
                  ? `Update Package: ${selectedPackage?.name}`
                  : "Create New Package"
              }
              typeSubmit={isUpdate ? "Update" : "Create"}
              onSubmit={handleSubmit}
              defaultValues={isUpdate ?  {
                name: selectedPackage?.name,
                price: selectedPackage?.price.toString(),
                description: selectedPackage?.description,
              } : {}}
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
                { key: "price", label: "Price" },
                { key: "description", label: "description" },
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
