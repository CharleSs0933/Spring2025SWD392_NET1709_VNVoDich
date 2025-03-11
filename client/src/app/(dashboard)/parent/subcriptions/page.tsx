"use client";

import Loading from "@/components/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/hooks/useUser";
import { getStatusStyles } from "@/lib/utils";
import { useGetParentBookingsQuery } from "@/state/api";
import { EllipsisVerticalIcon } from "lucide-react";
import React from "react";

// Helper function to calculate age

const SubcriptionListPage = () => {
  const { loading, isLogged } = useUser();
  const {
    data: subcriptions,
    isLoading,
    isError,
  } = useGetParentBookingsQuery({});

  console.log(subcriptions);

  if (loading) return <Loading />;
  if (!isLogged) return <div>Please sign in to access this page.</div>;
  if (isError) return <div>Failed to fetch course data</div>;

  return (
    <div className="space-y-8">
      <div className="space-y-6 bg-customgreys-secondarybg">
        <h2 className="text-2xl font-semibold">Subscription List</h2>
        <div className="h-[400px] w-full">
          {isLoading ? (
            <Loading />
          ) : (
            <Table className="text-customgreys-dirtyGrey min-h-[200px]">
              <TableHeader className="bg-customgreys-darkGrey">
                <TableRow className="border-none text-white-50">
                  <TableHead className="border-none p-4">Child </TableHead>
                  <TableHead className="border-none p-4">
                    Course Title
                  </TableHead>
                  <TableHead className="border-none p-4">Subject</TableHead>
                  <TableHead className="border-none p-4">Grade</TableHead>
                  <TableHead className="border-none p-4">Price</TableHead>
                  <TableHead className="border-none p-4">
                    Total Lessons
                  </TableHead>
                  <TableHead className="border-none p-4">
                    Sessions Remaining
                  </TableHead>
                  <TableHead className="border-none p-4">Status</TableHead>
                  <TableHead className="border-none p-4">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-customgreys-primarybg min-h-[200px]">
                {subcriptions && subcriptions.length > 0 ? (
                  subcriptions.map((subscription) => (
                    <TableRow className="border-none" key={subscription.id}>
                      <TableCell className="border-none p-4 font-medium">
                        {subscription.children?.profile?.full_name}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {subscription.course?.title}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {subscription.course?.subject}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {subscription.course?.grade}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        ${subscription.course?.price}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {subscription.course?.total_lessons}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        {subscription.sessions_remaining}
                      </TableCell>
                      <TableCell className="border-none p-4">
                        <span
                          className={
                            getStatusStyles(subscription.status).className
                          }
                        >
                          {React.createElement(
                            getStatusStyles(subscription.status).icon
                          )}
                          {subscription.status}
                        </span>
                      </TableCell>
                      <TableCell className="border-none p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <EllipsisVerticalIcon size={16} />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-customgreys-primarybg">
                            <DropdownMenuItem>
                              Cancel Subscription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-none">
                    <TableCell
                      className="border-none p-4 text-center"
                      colSpan={9} // Adjusted to match the number of columns
                    >
                      No subscriptions to display
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

export default SubcriptionListPage;
