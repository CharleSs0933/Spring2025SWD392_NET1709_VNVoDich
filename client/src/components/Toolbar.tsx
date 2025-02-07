import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToolbarProps } from "@/types";
import { courseSubjects } from "@/lib/utils";

const Toolbar = ({ onSearch, onSubjectChange }: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
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
    </div>
  );
};

export default Toolbar;
