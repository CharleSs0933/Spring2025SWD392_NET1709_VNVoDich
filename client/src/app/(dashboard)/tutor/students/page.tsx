"use client";

import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { calculateAge } from "@/lib/utils";
import { useGetChildrenQuery } from "@/state/api";
import React from "react";

const StudentListPage = () => {
  const { user, loading } = useUser();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  if (loading) return <Loading />;
  if (!user) return <div>Please sign in to access this page.</div>;
  if (isError) return <div>Failed to fetch course data</div>;

  return (
    <div className="space-y-8">
      <div className="space-y-6 bg-customgreys-secondarybg">
        <h2 className="text-2xl font-semibold">Student List</h2>
        <div className="h-[400px] w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <Table className="text-customgreys-dirtyGrey min-h-[200px]">
              <TableHeader className="bg-customgreys-darkGrey">
                <TableRow className="border-none text-white-50">
                  <TableHead className="border-none p-4">Full_name</TableHead>
                  <TableHead className="border-none p-4">Age</TableHead>
                  <TableHead className="border-none p-4">
                    Date of Birth
                  </TableHead>
                  <TableHead className="border-none p-4" colSpan={2}>
                    Learning_goals
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-customgreys-primarybg min-h-[200px]">
                {children && children.length > 0 ? (
                  children.map((child) => (
                    <TableRow className="border-none" key={child.id}>
                      <TableCell className="border-none p-4 font-medium">
                        {child.profile?.full_name}
                      </TableCell>
                      <TableCell className="border-none p-4 font-medium">
                        {calculateAge(child.date_of_birth)}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {child.date_of_birth.split("T")[0]}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {child.learning_goals}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-none">
                    <TableCell
                      className="border-none p-4 text-center"
                      colSpan={5}
                    >
                      No childs to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentListPage;
