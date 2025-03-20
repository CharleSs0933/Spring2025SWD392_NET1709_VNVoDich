"use client";
import Packages from "@/components/nondashboard/Packages";
import {
  useCreatePackageTutorMutation,
  useCreatePayMentMutation,
  useGetPackageQuery,
  useGetTutorSubMutation,
} from "@/state/apiAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";

const Package = () => {
  const router = useRouter();
  const userData = Cookies.get("user");
  const { data: packages, isLoading: isLoading } = useGetPackageQuery({});
  const [tutorSub] = useGetTutorSubMutation();
  const [tutorPayment] = useCreatePayMentMutation();

  const [createPackage] = useCreatePackageTutorMutation();
  const handleOrderClick = async (plan_id: number, billing_cycle: string) => {
    console.log(plan_id, billing_cycle);
    if (userData && plan_id && billing_cycle) {
      const parsedUser = JSON.parse(userData);
      console.log(parsedUser.ID);
      const resCreate = await createPackage({
        tutor_id: parsedUser.ID,
        plan_id: plan_id,
        billing_cycle: billing_cycle,
      });
      console.log(resCreate, "create");

      const resGet = await tutorSub({ id: parsedUser.ID });
      console.log(resGet, "get");

      const resPayment = await tutorPayment({
        orderId: resGet?.data?.payment_order_id,
        amount: resGet?.data?.price,
        description: resGet?.data?.plan_name,
      });
      console.log(resPayment, "ff");
      router.push(resPayment?.data?.redirectUrl);
     
    } else {
      console.log("faild");
    }
  };

  console.log(packages);

  return (
    <div>
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <Packages orderButton={handleOrderClick} packages={packages || []} />
          {/* <IntroPackages/> */}
        </div>
      )}
    </div>
  );
};

export default Package;
