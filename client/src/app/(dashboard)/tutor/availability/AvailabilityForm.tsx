import { CustomFormField } from "@/components/CustomFormField";
import { Form } from "@/components/ui/form";
import { availabilitySchema } from "@/lib/schemas";
import { days } from "@/lib/utils";
import { Availability } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { timeSlots } from "./data";
import { Button } from "@/components/ui/button";
import { useUpdateAvailabilityMutation } from "@/state/api";

const AvailabilityForm = ({ initialData }: { initialData: Availability }) => {
  const [updateAvailability, { isLoading }] = useUpdateAvailabilityMutation();

  const methods = useForm<Availability>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...initialData },
  });

  const onSubmit = async (data: Availability) => {
    // console.log(data);
    await updateAvailability(data);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {days.map((day) => {
          const isAvailable = methods.watch(`${day}.isAvailable`);

          return (
            <div key={day} className="flex items-center space-x-10 mb-4">
              <span className="w-24 font-extrabold text-xl">
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </span>

              <CustomFormField
                name={`${day}.isAvailable`}
                type="switch"
                className="flex items-center space-x-2"
                inputClassName="data-[state=checked]:bg-green-500"
                label={
                  methods.watch(`${day}.isAvailable`)
                    ? "Available"
                    : "Unavailable"
                }
              />
              {isAvailable && (
                <>
                  <CustomFormField
                    name={`${day}.startTime`}
                    type="select"
                    placeholder="Select Start Time"
                    options={timeSlots}
                    label=""
                    className="w-32 "
                  />
                  <span>to</span>
                  <CustomFormField
                    name={`${day}.endTime`}
                    type="select"
                    placeholder="Select End Time"
                    options={timeSlots}
                    label=""
                    className="w-32"
                  />
                  {methods.formState.errors[day]?.endTime && (
                    <span className="text-red-500 text-sm ml-2">
                      {methods.formState.errors[day].endTime.message}
                    </span>
                  )}
                </>
              )}
            </div>
          );
        })}
        <div className="flex items-center space-x-4">
          <span className="w-48">Minimum gap before booking (minutes):</span>

          <CustomFormField
            type="number"
            name="timeGap"
            label=""
            className="w-32"
          />
        </div>

        <Button
          type="submit"
          className="!mt-8 text-gray-100 bg-primary-700 hover:bg-primary-600"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Settings "}
        </Button>
      </form>
    </Form>
  );
};

export default AvailabilityForm;
