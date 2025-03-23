"use client";

import Loading from "@/components/Loading";
import CustomInput from "@/components/nondashboard/CustomInput";
import { Button } from "@/components/ui/button";
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
import {
  useCancelBookingMutation,
  useGetParentBookingsQuery,
} from "@/state/api";
import {
  useCreateRequestRefundMutation,
  useGetRequestRefundOfParentQuery,
} from "@/state/apiAuth";
import { CourseSubcription, Subscription, TeachingSession } from "@/types";
import { ChevronDownIcon, EllipsisVerticalIcon } from "lucide-react";
import React, { useState } from "react";
import { SessionDetailDialog } from "../../tutor/schedule/SessionDetailDialog";
import { Dialog } from "@/components/ui/dialog";
import { RescheduleSessionDialog } from "@/components/dashboard/parent/TeachingSessionDialog";

const SubcriptionListPage = () => {
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [openInput, setOpenInput] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<TeachingSession | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    number | null
  >(null);
  const { loading, isLogged } = useUser();
  const {
    data: subcriptions,
    isLoading,
    isError,
    refetch,
  } = useGetParentBookingsQuery({});

  const { data: requests } = useGetRequestRefundOfParentQuery({});
  const requestArray = Array.isArray(requests) ? requests : [];

  const [createRefundRequest] = useCreateRequestRefundMutation();
  const [cancelBooking] = useCancelBookingMutation();

  if (loading) return <Loading />;
  if (!isLogged) return <div>Please sign in to access this page.</div>;
  if (isError) return <div>Failed to fetch course data</div>;

  const handleCanncel = async (sub: CourseSubcription) => {
    try {
      await cancelBooking({ subscriptionId: sub.id }).unwrap();
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleExpand = (subscriptionId: number) => {
    setExpandedSubscriptionId(
      expandedSubscriptionId === subscriptionId ? null : subscriptionId
    );
  };

  const handleOpenDialog = (session: TeachingSession) => {
    setSelectedSession(session);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedSession(null);
  };

  const handleOpenRescheduleDialog = (session: TeachingSession) => {
    setSelectedSession(session);
    setIsRescheduleDialogOpen(true);
  };

  const handleCloseRescheduleDialog = () => {
    setIsRescheduleDialogOpen(false);
    setSelectedSession(null);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6 bg-customgreys-secondarybg">
        <h2 className="text-2xl font-semibold">Subscription List</h2>
        <div className={`h-[400px] w-full `}>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={`${openInput ? "blur-sm" : ""}`}>
              <Table className="text-customgreys-dirtyGrey min-h-[200px]">
                <TableHeader className="bg-[#5C5470]">
                  <TableRow className="border-none text-white-50">
                    <TableHead className="border-none p-4"> </TableHead>
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
                      <React.Fragment key={subscription.id}>
                        <TableRow className="border-none">
                          <TableCell className="border-none p-4 font-medium text-customgreys-blueGrey">
                            <button
                              onClick={() => toggleExpand(subscription.id)}
                            >
                              <ChevronDownIcon size={16} />
                            </button>
                          </TableCell>
                          <TableCell className="border-none p-4 font-medium text-customgreys-blueGrey">
                            {subscription.children?.profile?.full_name}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {subscription.course?.title}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {subscription.course?.subject}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {subscription.course?.grade}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            ${subscription.price}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {subscription.course?.total_lessons}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {subscription.sessions_remaining}
                          </TableCell>
                          <TableCell className="border-none p-4 text-customgreys-blueGrey">
                            {(() => {
                              const foundRequest = requestArray?.find(
                                (res) =>
                                  res.order_id === String(subscription.id)
                              );
                              const status =
                                foundRequest?.status || subscription.status;

                              const { className, icon } =
                                getStatusStyles(status);

                              return (
                                <span className={className}>
                                  {React.createElement(icon)}
                                  {status}
                                </span>
                              );
                            })()}
                          </TableCell>
                          <TableCell className="border-none p-4">
                            {subscription.course.total_lessons -
                              subscription.sessions_remaining <
                              3 && (
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <EllipsisVerticalIcon size={16} />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-customgreys-primarybg">
                                  <DropdownMenuItem
                                    onClick={() => handleCanncel(subscription)}
                                  >
                                    Cancel Subscription
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </TableCell>
                        </TableRow>
                        {expandedSubscriptionId === subscription.id && (
                          <TableRow>
                            <TableCell colSpan={10} className="p-0">
                              <div className="bg-customgreys-lightGrey">
                                <Table>
                                  <TableHeader className="bg-gray-800">
                                    <TableRow>
                                      <TableHead></TableHead>
                                      <TableHead className="text-white-100 p-3">
                                        Topic
                                      </TableHead>
                                      <TableHead className="text-white-100 p-3">
                                        Time
                                      </TableHead>
                                      <TableHead className="text-white-100 p-3">
                                        Status
                                      </TableHead>
                                      <TableHead className="text-white-100 p-3">
                                        Actions
                                      </TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {subscription.teachingSessions.length <
                                    0 ? (
                                      <TableRow>
                                        <TableCell
                                          colSpan={10}
                                          className="text-white-100 p-3"
                                        >
                                          No teaching sessions found
                                        </TableCell>
                                      </TableRow>
                                    ) : (
                                      <>
                                        {subscription.teachingSessions.map(
                                          (session) => (
                                            <TableRow key={session.id}>
                                              <TableCell></TableCell>
                                              <TableCell className="p-3 border-b text-gray-300">
                                                {session.topics_covered}
                                              </TableCell>
                                              <TableCell className="p-3 border-b text-gray-300">
                                                {
                                                  session.startTime.split(
                                                    /[T,:]/
                                                  )[1]
                                                }
                                                {":"}
                                                {
                                                  session.startTime.split(
                                                    /[T,:]/
                                                  )[2]
                                                }{" "}
                                                -{" "}
                                                {
                                                  session.endTime.split(
                                                    /[T,:]/
                                                  )[1]
                                                }
                                                {":"}
                                                {
                                                  session.endTime.split(
                                                    /[T,:]/
                                                  )[2]
                                                }
                                              </TableCell>
                                              <TableCell className="p-3 border-b">
                                                <span
                                                  className={`px-4 py-1 rounded-full text-base ${
                                                    session.status === "attend"
                                                      ? "bg-green-100 text-green-800"
                                                      : session.status ===
                                                        "absent"
                                                      ? "bg-red-100 text-red-800"
                                                      : "bg-blue-100 text-blue-800"
                                                  }`}
                                                >
                                                  {session.status}
                                                </span>
                                              </TableCell>
                                              <TableCell className="p-3 border-b">
                                                <div className="flex space-x-2">
                                                  <Button
                                                    className="text-white-50 text-sm bg-gray-600 rounded-full"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                      handleOpenDialog(session)
                                                    }
                                                  >
                                                    Detail
                                                  </Button>
                                                  {session.status ===
                                                    "NotYet" && (
                                                    <Button
                                                      className="text-white-50 text-sm bg-gray-600 rounded-full"
                                                      variant="outline"
                                                      size="sm"
                                                      onClick={() =>
                                                        handleOpenRescheduleDialog(
                                                          session
                                                        )
                                                      }
                                                    >
                                                      Change
                                                    </Button>
                                                  )}
                                                </div>
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )}
                                      </>
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow className="border-none">
                      <TableCell
                        className="border-none p-4 text-center"
                        colSpan={9}
                      >
                        No subscriptions to display
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        {selectedSession && (
          <SessionDetailDialog
            session={selectedSession}
            refetch={() => refetch()}
            isTutor={false}
          />
        )}
      </Dialog>

      <Dialog
        open={isRescheduleDialogOpen}
        onOpenChange={handleCloseRescheduleDialog}
      >
        {selectedSession && (
          <RescheduleSessionDialog
            session={selectedSession}
            refetch={refetch}
          />
        )}
      </Dialog>
    </div>
  );
};

export default SubcriptionListPage;
