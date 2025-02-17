"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetChildrenQuery } from "@/state/api";
import { SlidersHorizontal, X } from "lucide-react";
import { Children } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const router = useRouter();
  const params = useParams();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  const handleViewChildSchedule = (child: Children) => {
    router.push(`/parent/children/${child.id}`);
    console.log("Enter");
  };

  if (isLoading) return <Loading />;
  if (isError || !children) return <div>Error loading children.</div>;

  return (
    <div className=" w-full h-full">
      <Header title="Children" subtitle="Browse your children" />

      <div className="child__container">
        {/* Table */}
        {isLoading ? (
          <Loading />
        ) : (
          <Table className="child__table">
            <TableHeader className="child__table-header">
              <TableRow className="child__table-header-row">
                <TableHead className="child__table-cell">Full_name</TableHead>
                <TableHead className="child__table-cell">Age</TableHead>
                <TableHead className="child__table-cell">Grade_level</TableHead>
                <TableHead className="child__table-cell" colSpan={2}>
                  Learning_goals
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="child__table-body">
              {children.length > 0 ? (
                children.map((child) => (
                  <TableRow
                    className="child__table-row"
                    key={child.id}
                    onClick={() => handleViewChildSchedule(child)}
                  >
                    <TableCell className="child__table-cell">
                      {child.full_name}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      {child.age}
                    </TableCell>
                    <TableCell className="child__table-cell child__amount">
                      {child.grade_level}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      {child.learning_goals}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      <SlidersHorizontal />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="child__table-row">
                  <TableCell
                    className="child__table-cell text-center"
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
  );
};

export default Courses;
