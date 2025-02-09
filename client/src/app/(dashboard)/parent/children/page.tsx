"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetChildrenQuery } from "@/state/api";
import { SlidersHorizontal, X } from "lucide-react";
import { Children } from "@/types";
import BigCalendar from "@/app/components/BigCalendar";

const Courses = () => {
  const { data: children, isLoading, isError } = useGetChildrenQuery({});
  const [selectedChild, setSelectedChild] = useState<Children | null>(null);

  if (isLoading) return <Loading />;
  if (isError || !children) return <div>Error loading children.</div>;

  console.log(children);

  return (
    <div className=" w-full h-full">
      <Header title="Children" subtitle="Browse your chidlren" />

      <div className="child__container">
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&apos;s Schedule</h1>
          <BigCalendar />
        </div>
        {/* Card */}
        {selectedChild && (
          <motion.div
            className=" bg-white shadow-lg p-4 rounded-lg  "
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Card className="w-[400px]">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>
                  <span className="bg-customgreys-purpleGrey text-gray-700 rounded-2xl px-3 py-1">
                    {selectedChild.full_name}
                  </span>
                  's Details
                </CardTitle>
                <button onClick={() => setSelectedChild(null)}>
                  <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
                </button>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Age:</strong> {selectedChild.age}
                </p>
                <p>
                  <strong>Grade Level:</strong> {selectedChild.grade_level}
                </p>
                <p>
                  <strong>Learning Goals:</strong>{" "}
                  {selectedChild.learning_goals}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Table */}
        {isLoading ? (
          <Loading />
        ) : (
          <motion.div
            animate={{ y: selectedChild ? 20 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Table className="child__table">
              <TableHeader className="child__table-header">
                <TableRow className="child__table-header-row">
                  <TableHead className="child__table-cell">Full_name</TableHead>
                  <TableHead className="child__table-cell">Age</TableHead>
                  <TableHead className="child__table-cell">
                    Grade_level
                  </TableHead>
                  <TableHead className="child__table-cell" colSpan={2}>
                    Learning_goals
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="child__table-body">
                {children.length > 0 ? (
                  children.map((child) => (
                    <TableRow
                      className="child__table-row hover:bg-gray-100"
                      key={child.id}
                      onClick={() => setSelectedChild(child)}
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Courses;
