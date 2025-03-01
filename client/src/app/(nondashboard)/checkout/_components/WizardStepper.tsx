import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

const WizardStepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-1/2 mb-4 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-2">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full mb-2",
                  {
                    "bg-green-500":
                      currentStep > step || (currentStep === 4 && step === 4),
                    "bg-primary-700": currentStep === step && step !== 4,
                    "border border-customgreys-dirtyGrey text-customgreys-dirtyGrey":
                      currentStep < step,
                  }
                )}
              >
                {currentStep > step || (currentStep === 3 && step === 3) ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <p
                className={cn("text-sm", {
                  "text-white-100": currentStep >= step,
                  "text-customgreys-dirtyGrey": currentStep < step,
                })}
              >
                {step === 1 && "Schedule"}
                {step === 2 && "Children"}
                {step === 3 && "Payment"}
                {step === 4 && "Completion"}
              </p>
            </div>
            {index < 3 && (
              <div
                className={cn("w-1/4 h-[1px] self-start mt-4", {
                  "bg-green-500": currentStep > step,
                  "bg-customgreys-dirtyGrey": currentStep <= step,
                })}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WizardStepper;
