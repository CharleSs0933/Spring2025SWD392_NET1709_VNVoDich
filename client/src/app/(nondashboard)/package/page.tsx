"use client"
import IntroPackages from "@/app/component/IntroPackages";
import Packages from "@/app/component/Packages";
import { useCreatePackageTutorMutation, useGetPackageQuery } from "@/state/apiAuth";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import React from "react";



const Package = () => {
  const router = useRouter()
   const userData = Cookies.get("user");
  const { data : packages, isLoading : isLoading, error } = useGetPackageQuery({});
  const [createPackage] = useCreatePackageTutorMutation()
  const handleOrderClick = async (plan_id: number , billing_cycle: string) => {
      console.log( plan_id , billing_cycle);
      if(userData && plan_id && billing_cycle){
        const parsedUser = JSON.parse(userData);
        console.log(parsedUser.ID);
        const res = await createPackage({tutor_id : parsedUser.ID , plan_id : plan_id , billing_cycle : billing_cycle})
        console.log(res);
        router.push(`/checkout/${plan_id}`)
      }else{
        console.log("faild");
      }
      
  }
  
  console.log(packages);
  
  return (
    <div>
      {isLoading ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <Packages orderButton={handleOrderClick} packages = {packages || []} />
          <IntroPackages/>
        </div>
      )}
    </div>
  );
};

export default Package;
