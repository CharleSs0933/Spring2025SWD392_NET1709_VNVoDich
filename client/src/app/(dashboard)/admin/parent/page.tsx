"use client"
import { useGetChildrenQuery } from '@/state/api'
import React from 'react'

const ManagementParent = () => {
    const { data: children, isLoading, isError } = useGetChildrenQuery(2);
    console.log(children);
    
  return (
    <div>ManagementParent</div>
  )
}

export default ManagementParent