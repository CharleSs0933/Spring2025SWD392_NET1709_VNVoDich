"use client"
import React from 'react'
import Landing from '../components/Landing'
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const page = () => {
    const coursesFromRedux = useSelector((state: RootState) => state.courses.courses);

console.log(coursesFromRedux, 'rat oke');
  return (
    <div>
        <Landing/>
    </div>
  )
}

export default page