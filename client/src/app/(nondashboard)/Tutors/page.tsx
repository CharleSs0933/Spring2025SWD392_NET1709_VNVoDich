"use client";
import Search from "@/app/component/search";
import { FocusCards } from "@/app/component/ui/focus-cards";
import { useGetTutorsQuery } from "@/state/api";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [isSearchValue, setIsSearchValue] = useState(false);
  const param = useSearchParams();
  
  const searchValue = param.get("query");
  const qualifications = param.get("qualifications");
  const teaching_style = param.get("teaching_style");

  const { data: tutorsFilter, isLoading: isLoadingFilter } = useGetTutorsQuery(
    searchValue && qualifications && teaching_style
      ? { qualifications, teaching_style }
      : {}
  );

  const { data: tutors, isLoading, isError } = useGetTutorsQuery({});

  React.useEffect(() => {
    setIsSearchValue(!!searchValue && !!qualifications && !!teaching_style);
  }, [searchValue, qualifications, teaching_style]);

  console.log(tutorsFilter)

  return (
    <div className="my-5">
      <h1 className="text-5xl text-center font-bold text-gray-300 mb-4 font-serif tracking-widest">
        Master New Skills
      </h1>
      <p className="text-xl text-center text-gray-400 max-w-2xl mx-auto">
        Explore our curated collection of premium courses taught by industry experts
      </p>
      <div className="mx-auto">
        <Search tutors={tutors} />
      </div>
      {isSearchValue ? (
        
        <FocusCards data={tutorsFilter || []} type="tutor" />
      ) : (
        <FocusCards data={tutors || []} type="tutor" />
      )}
    </div>
  );
};

export default Page;
