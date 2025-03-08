"use client";
import React, { useState, useEffect } from "react";
import CustomTable from "../../../component/CustomTable";
import { useGetTutorsQuery } from "@/state/api";

interface Tutor {
  id: number;
  bio: string;
  qualifications: string;
  teaching_style: string;
  is_available: boolean;
  profile?: {
    email: string;
    full_name: string;
    phone: string;
  };
}

const ManagementTutor = () => {
  const { data: tutorsFilter, isLoading: isLoadingFilter } = useGetTutorsQuery(
    {}
  );
  console.log(tutorsFilter);

  const [users, setUsers] = useState<
    { id: number; name: string; email: string, phone : string, qualifications: string, is_available:boolean }[]
  >([]);
  
  useEffect(() => {
    if (tutorsFilter) {
      const transformedUsers = (tutorsFilter as Tutor[]).map((tutor) => ({
        id: tutor.id,
        name: tutor.profile?.full_name ?? "Unknown", 
        email: tutor.profile?.email ?? "No email",  
        phone: tutor.profile?.phone ?? "No phone",  
        qualifications: tutor.qualifications ?? "No qualifications",  
        is_available: tutor.is_available ?? "No is_available",  
      }));
      setUsers(transformedUsers);
    }
  }, [tutorsFilter]);
  
  

  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = (id: number) => {
    alert(`Update user with ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tutor List</h1>
      {isLoadingFilter ? (
        <p>Loading...</p>
      ) : (
        <CustomTable
          data={users}
          columns={[
            { key: "name", label: "name" },
            { key: "email", label: "email" },
            { key: "phone", label: "phone" },
            { key: "qualifications", label: "qualifications" },
            { key: "is_available", label: "is_available" },
          ]}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManagementTutor;
