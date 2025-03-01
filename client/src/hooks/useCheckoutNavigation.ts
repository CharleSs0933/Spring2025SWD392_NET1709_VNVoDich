import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useUser } from "./useUser";
import { useAppDispatch } from "@/state/redux";
import { clearBooking } from "@/state";

export const useCheckoutNavigation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loading } = useUser();
  const dispatch = useAppDispatch();

  const courseId = searchParams.get("id") ?? "";
  const checkoutStep = parseInt(searchParams.get("step") ?? "1", 10);

  const navigateToStep = useCallback(
    (step: number) => {
      const newStep = Math.min(Math.max(1, step), 3);

      router.push(`/checkout?step=${newStep}&id=${courseId}`, {
        scroll: false,
      });
    },
    [courseId, router]
  );

  useEffect(() => {
    if (loading && checkoutStep > 1) {
      navigateToStep(1);
      dispatch(clearBooking());
    }
  }, [loading, checkoutStep, navigateToStep]);

  return { checkoutStep, navigateToStep };
};
