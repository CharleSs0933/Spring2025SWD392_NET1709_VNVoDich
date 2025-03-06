"use client";
import CustomInput from "@/app/component/CustomInput";
import CustomTable from "@/app/component/CustomTable";
import { useDeleteUserMutation, useGetUsersQuery } from "@/state/apiAuth";
import { Users } from "@/types";
import React, { useEffect, useState } from "react";

const ManagementUser = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  
  const { data: users, isLoading } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const [usersList, setUsersList] = useState<
    {
      id: number;
      username: string;
      role: string;
      phone: string;
      is_verified: boolean;
      status: string;
      account_locked: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (users) {
      const transformedUsers = (users as Users[]).map((user) => ({
        id: user.ID || 0,
        username: user.username || "unknown",
        role: user.role || "unknown",
        phone: user.phone || "unknown",
        is_verified: user.is_verified || false,
        status: user.status || "unknown",
        account_locked: user.account_locked || false,
      }));
      setUsersList(transformedUsers);
    }
  }, [users]);

  const handleDelete = async (username: string) => {
    try {
      await deleteUser({ username }).unwrap();
      setUsersList((prev) => prev.filter((user) => user.username !== username));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (username: string) => {
    const userToUpdate = usersList.find((user) => user.username === username);
    if (userToUpdate) {
      setSelectedUser(userToUpdate);
      setIsUpdate(true);
    }
  };

  const handleSubmit = (data: Record<string, string>) => {
    console.log("justin do ne", data);
    setIsUpdate(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="  bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
        <p className="text-gray-600 mb-6">
          Manage your users, update their details, and remove inactive accounts.
        </p>

        {isUpdate && selectedUser ? (
          <div className="mb-6 bg-gray-50 shadow-md p-5 rounded-lg">
            
            <CustomInput
              fields={["username", "role", "phone"]}
              title={`Please Input New Data: ${selectedUser.username}`}
              typeSubmit="Update"
              onSubmit={handleSubmit}
            />
            <button
              onClick={() => setIsUpdate(false)}
              className="mt-3 text-red-500 font-semibold underline"
            >
              Cancel
            </button>
          </div>
        ) : isLoading ? (
          <p className="text-black">Loading users...</p>
        ) : (
          <div className="bg-white-100 shadow-md rounded-lg overflow-hidden">
            <CustomTable
              data={usersList}
              columns={[
                { key: "username", label: "User Name" },
                { key: "role", label: "Role" },
                { key: "phone", label: "Phone" },
                { key: "is_verified", label: "Verified" },
                { key: "status", label: "Status" },
                { key: "account_locked", label: "Locked" },
              ]}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementUser;
