"use client";

import Loading from "@/components/Loading";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@/hooks/useUser";
import WizardStepper from "./_components/WizardStepper";
import SchedulePage from "./schedule";
import ChildrenPage from "./children";
import PaymentPage from "./payment";
import CompletionPage from "./completion";
// import {
//   useGetChildrenQuery,
//   useGetCourseAvailabilityQuery,
//   useGetCourseQuery,
// } from "@/state/api";
// import { useSearchParams } from "next/navigation";
// import React from "react";
// import CoursesDetails from "./_components/course-details";
// import BookingForm from "./_components/booking-form";
// import Loading from "@/components/Loading";

// const CourseCheckoutPage = () => {
//   const searchParams = useSearchParams();
//   const courseId = searchParams.get("id") ?? "";

//   const {
//     data: course,
//     isLoading: isCourseLoading,
//     isError,
//   } = useGetCourseQuery(courseId, { skip: !courseId });

//   const { data: availabilites, isLoading: isAvailabilityLoading } =
//     useGetCourseAvailabilityQuery({ courseId }, { skip: !courseId });

//   const { data: availableChildren, isLoading: isChildrenLoading } =
//     useGetChildrenQuery({});

//   if (isCourseLoading || isAvailabilityLoading || isChildrenLoading)
//     return <Loading />;
//   if (isError || !course || !availabilites)
//     return <div>Failed to fetch course data</div>;

//   return (
//     <div className="flex flex-col justify-center lg:flex-row px-4 py-8 ">
//       <CoursesDetails course={course} />
//       <BookingForm
//         course={course}
//         availabilities={availabilites}
//         children={availableChildren || []}
//       />
//     </div>
//   );
// };

// export default CourseCheckoutPage;

const CheckoutWizard = () => {
  const { loading } = useUser();
  const { checkoutStep } = useCheckoutNavigation();

  if (loading) return <Loading />;

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <SchedulePage />;
      case 2:
        return <ChildrenPage />;
      case 3:
        return <PaymentPage />;
      case 4:
        return <CompletionPage />;
      default:
        return <SchedulePage />;
    }
  };

  return (
    <div className="w-full px-4 h-full flex flex-col items-center py-12">
      <WizardStepper currentStep={checkoutStep} />
      <div className="w-full max-w-screen-lg flex flex-col items-center mt-10">
        {renderStep()}
      </div>
    </div>
  );
};

export default CheckoutWizard;
