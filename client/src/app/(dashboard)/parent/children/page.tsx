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

import {
  useCreateChildrenMutation,
  useDeleteChildrenMutation,
  useGetChildrenQuery,
} from "@/state/api";
import { SlidersHorizontal, X } from "lucide-react";
import { Children } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChildDialog } from "@/components/dashboard/parent/ChildDialog";

const ChildrenManagement = () => {
  const router = useRouter();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  const [createChild] = useCreateChildrenMutation();
  const [deleteChild] = useDeleteChildrenMutation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    full_name: "",
    password: "",
    age: "",
    grade_level: "",
    learning_goals: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleViewChildSchedule = (child: Children) => {
    router.push(`/parent/children/${child.id}`);
  };

  const handleCreateChildAccount = async () => {
    const result = await createChild({
      full_name: formData.full_name,
      password: formData.password,
      age: parseInt(formData.age),
      grade_level: formData.grade_level,
      learning_goals: formData.learning_goals,
    }).unwrap();
    setOpen(false);
  };

  const handleDeleteChild = async (id: number) => {
    await deleteChild(id).unwrap();
  };

  if (isLoading) return <Loading />;
  if (isError || !children) return <div>Error loading children.</div>;

  return (
    <div className=" w-full h-full">
      <Header
        title="Children"
        subtitle="Browse your children"
        rightElement={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-700 hover:bg-primary-600">
                Create Child Account
              </Button>
            </DialogTrigger>
            <ChildDialog
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleCreateChildAccount}
              handleClose={handleClose}
              mode="create"
            />
          </Dialog>
        }
      />

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
                  <TableRow className="child__table-row" key={child.id}>
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
                      <Button
                        onClick={() => handleViewChildSchedule(child)}
                        className="bg-blue-600 hover:bg-blue-500 mr-3"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDeleteChild(child.id)}
                        className="bg-red-600 hover:bg-red-500"
                      >
                        Delete
                      </Button>
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

export default ChildrenManagement;
