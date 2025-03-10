"use client";

import Loading from "@/components/Loading";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import { useUser } from "@/hooks/useUser";
import WizardStepper from "./_components/WizardStepper";
import SchedulePage from "./schedule";
import ChildrenPage from "./children";
import PaymentPage from "./payment";
import CompletionPage from "./completion";
import { Suspense } from "react";

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

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutWizard />
    </Suspense>
  );
};

export default Page;
