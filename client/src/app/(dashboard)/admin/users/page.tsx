"use client";
import CustomInput from "@/app/component/CustomInput";
import CustomTable from "@/app/component/CustomTable";
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "@/state/apiAuth";
import { Users } from "@/types";
import React, { useEffect, useState } from "react";

const ManagementUser = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  
  const { data: users, isLoading, refetch } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [usersList, setUsersList] = useState<
    {
      id: number;
      username: string;
      fullname: string;
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
        fullname: user.full_name || "unknown",
        role: user.role || "unknown",
        phone: user.phone || "unknown",
        is_verified: user.is_verified || false,
        status: user.status || "unknown",
        account_locked: user.account_locked || false,
      }));
      setUsersList(transformedUsers);
    }
  }, [users ]);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser({ id }).unwrap();
      setUsersList((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleUpdate = (id: number) => {
    const userToUpdate = usersList.find((user) => user.id === id);
    if (userToUpdate) {
      setSelectedUser(userToUpdate);
      setIsUpdate(true);
    }
  };
  

  const handleSubmit = async (data: Record<string, string>) => {
  
    try {
      if(isUpdate){
        await updateUser({
          id: selectedUser?.id | 0, 
          email: data.email, 
          full_name: data.fullname, 
          phone: data.phone,
        }).unwrap();
        setIsUpdate(false);
        setSelectedUser(null);

      }else{
        setIsCreate(false)
        console.log(data);
        
      }
      
      refetch()
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  
  const handleCreate = () =>{
    setIsCreate(!isCreate)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="  bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-black mb-2">User Management</h1>
        <p className="text-gray-600 mb-6">
          Manage your users, update their details, and remove inactive accounts.
        </p>

        {isUpdate && selectedUser  || isCreate ? (
          <div className="mb-6 bg-gray-50 shadow-md p-5 rounded-lg">
            

            <CustomInput
              fields={["fullname", "email","role", "phone"]}
              title={`${isUpdate ? `Please Input New Data: ${selectedUser.username || "knownow"}` : 'Please Input User Data'}`}
              typeSubmit={`${isUpdate ? "Update" : "Create"}`}
              onSubmit={handleSubmit}
            />
            <button
              onClick={() => isUpdate ? setIsUpdate(false) : setIsCreate(false)}
              className="mt-3 text-red-500 font-semibold underline"
            >
              Cancel
            </button>
          </div>
        ) : isLoading ? (
          <p className="text-black">Loading users...</p>
        )  :(
          <div className="bg-white-100 shadow-md rounded-lg overflow-hidden">
            <CustomTable
              data={usersList}
              columns={[
                { key: "username", label: "User Name" },
                { key: "fullname", label: "Full Name" },
                { key: "role", label: "Role" },
                { key: "phone", label: "Phone" },
                { key: "is_verified", label: "Verified" },
                { key: "status", label: "Status" },
                { key: "account_locked", label: "Locked" },
              ]}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onCreate={handleCreate}
            />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementUser;
