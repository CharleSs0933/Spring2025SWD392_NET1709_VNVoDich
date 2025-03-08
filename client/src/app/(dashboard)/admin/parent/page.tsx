"use client"
import CustomTable from '@/app/component/CustomTable';
import { useGetChildrenQuery, useGetParentsQuery } from '@/state/api'
import { Parent } from '@/types';
import React, { useEffect, useState } from 'react'

const ManagementParent = () => {
    const { data: parents, isLoading, isError } = useGetParentsQuery({});
    console.log(parents);
    const [user , setUser] = useState< { id : number , preferred_language : string , notifications_enabled : boolean , childrens: Array[],email: string , full_name: string , phone: string  }[] >([])

    useEffect(() => {
      if(parents){
        const transformedUsers = (parents as Parent[]).map((parent) => ({
          id: parent.id,
          preferred_language: parent.preferred_language,
          notifications_enabled : parent.notifications_enabled,
          childrens : parent.childrens,
          email: parent.profile.email,
          full_name: parent.profile.full_name,
          phone: parent.profile.phone,

        }))
        setUser(transformedUsers)
      }
    }, [parents])
    
    const handleDelete = (id: number) => {
      setUser(user.filter((parent) => parent.id !== id));
    };
  
    const handleUpdate = (id: number) => {
      alert(`Update user with ID: ${id}`);
    };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tutor List</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CustomTable
          data={user}
          columns={[
            { key: "full_name", label: "name" },
            { key: "email", label: "email" },
            { key: "phone", label: "phone" },
            { key: "preferred_language", label: "preferred_language" },
            { key: "notifications_enabled", label: "notifications_enabled" },
            { key: "childrens", label: "childrens " },
          ]}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ManagementParent