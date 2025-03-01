import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import React from "react";
import CourseDetails from "../_components/course-details";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const { course, courseId } = useCurrentCourse();
  const router = useRouter();

  if (!course) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="sm:flex gap-10 mb-6">
        <div className="basis-1/2 rounded-lg">
          <CourseDetails course={course} />
        </div>
        <div className="basis-1/2">
          <form className="space-y-4">
            <div className="flex flex-col gap-4 bg-customgreys-secondarybg px-10 py-10 rounded-lg">
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-sm text-gray-400">
                Fill out the payment details below to complete your purchase.
              </p>

              <div className="flex flex-col gap-2 w-full mt-6">
                <h3 className="text-md">Payment method</h3>

                <div className="flex flex-col border-[2px] border-white-100/5 rounded-lg">
                  <div className="flex items-center gap-2 bg-white-50/5 py-2 px-2">
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className="px-4 py-6">{/* <PaymentElement /> */}</div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex justify-between items-center w-full mt-6">
            <Button
              className="hover:bg-white-50/10"
              onClick={() => router.back()}
              variant="outline"
              type="button"
            >
              Back
            </Button>

            <Button
              className="hover:bg-primary-600 bg-primary-700"
              type="submit"
              form="payment-form"
              //   disabled={!stripe || !elements}
            >
              Pay with Credit Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
