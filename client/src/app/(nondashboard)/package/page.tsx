"use client"
import Packages from "@/app/component/Packages";
import { useRouter } from "next/navigation";
import React from "react";

const packages = [
  {
    id: 1,
    name: "Basic Plan",
    price: 9.99,
    month: "3 month",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: 2,
    name: "Standard Plan",
    price: 19.99,
    month: "6 month",
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
  },
  {
    id: 3,
    name: "Premium Plan",
    price: 29.99,
    month: "12 month",
    features: ["All Standard Features", "Feature 5", "Feature 6"],
  },
];


const Package = () => {
  const router = useRouter()
  const handleOrderClick = (id: number) => {
    router.push(`payment/${id}`)
  }
  
  return (
    <div>

    <Packages orderButton={handleOrderClick} packages = {packages} />
    </div>
  );
};

export default Package;
