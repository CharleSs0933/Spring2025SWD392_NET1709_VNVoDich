"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useGetTutorAvailabilityQuery } from "@/state/api";
import React from "react";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./AvailabilityForm";

const Availability = () => {
  const {
    data: availability,
    isLoading,
    isError,

    refetch,
  } = useGetTutorAvailabilityQuery({});

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading availability.</div>;

  return (
    <div className="w-full h-full">
      <Header title="Availability" subtitle="Browse your availability" />
      <AvailabilityForm
        initialData={availability || defaultAvailability}
        refetch={refetch}
      />
    </div>
  );
};

export default Availability;
