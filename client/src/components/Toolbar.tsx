import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolbarProps } from "@/types";
import { courseGrades, courseSubjects } from "@/lib/utils";
import useDebounce from "@/hooks/useDebounce";

const Toolbar = ({
  onSearch,
  onSubjectChange,
  onGradeChange,
}: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce({ value: searchTerm, delay: 500 });

  useEffect(() => {
    onSearch(debounceSearch);
  }, [debounceSearch, onSearch]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses"
        className="w-full px-5 h-12 bg-customgreys-primarybg placeholder-customgreys-dirtyGrey text-customgreys-dirtyGrey border-none rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      <Select onValueChange={onSubjectChange}>
        <SelectTrigger className="h-12 w-[180px] bg-customgreys-primarybg text-customgreys-dirtyGrey border-none">
          <SelectValue placeholder="Subjects" />
        </SelectTrigger>
        <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
          <SelectItem
            value="all"
            className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
          >
            All Subjects
          </SelectItem>
          {courseSubjects.map((subject) => (
            <SelectItem
              key={subject.value}
              value={subject.value}
              className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
            >
              {subject.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={onGradeChange}>
        <SelectTrigger className="h-12 w-[180px] bg-customgreys-primarybg text-customgreys-dirtyGrey border-none">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
          <SelectItem
            value="all"
            className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
          >
            All Grade
          </SelectItem>
          {courseGrades.map((grade) => (
            <SelectItem
              key={grade.value}
              value={grade.value}
              className="cursor-pointer hover:!bg-gray-100 hover:!text-customgreys-darkGrey"
            >
              {grade.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Toolbar;
