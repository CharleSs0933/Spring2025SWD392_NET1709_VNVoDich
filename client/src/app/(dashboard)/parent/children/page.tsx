"use client";
import { useState } from "react";
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
import { Eye, Trash2 } from "lucide-react";
import { Children } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChildDialog } from "@/components/dashboard/parent/ChildDialog";
import { ConfirmDialog } from "@/components/dashboard/parent/ConfirmDialog";
import { calculateAge } from "@/lib/utils";

const ChildrenManagement = () => {
  const router = useRouter();
  const { data: children, isLoading, isError } = useGetChildrenQuery({});

  const [createChild] = useCreateChildrenMutation();
  const [deleteChild] = useDeleteChildrenMutation();

  const [open, setOpen] = useState(false);
  const [deleteChildId, setDeleteChildId] = useState<number | null>(null);

  const handleConfirmDelete = async () => {
    if (deleteChildId !== null) {
      await deleteChild(deleteChildId).unwrap();
      setDeleteChildId(null);
    }
  };

  const [formData, setFormData] = useState<any>({
    full_name: "",
    password: "",
    date_of_birth: "",
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
    await createChild({
      username: formData.username,
      full_name: formData.full_name,
      password: formData.password,
      date_of_birth: new Date(formData.date_of_birth).toISOString(),
      learning_goals: formData.learning_goals,
    }).unwrap();

    setOpen(false);
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
              <Button className="bg-primary-750 hover:bg-primary-600 rounded-xl">
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
                <TableHead className="child__table-cell">
                  Date of Birth
                </TableHead>
                <TableHead className="child__table-cell" colSpan={2}>
                  Learning_goals
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="child__table-body">
              {children && children.length > 0 ? (
                children.map((child) => (
                  <TableRow className="child__table-row" key={child.id}>
                    <TableCell className="child__table-cell">
                      {child.profile?.full_name}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      {calculateAge(child.date_of_birth)}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      {child.date_of_birth.split("T")[0]}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      {child.learning_goals}
                    </TableCell>
                    <TableCell className="child__table-cell">
                      <Button
                        onClick={() => handleViewChildSchedule(child)}
                        className="bg-primary-750 hover:bg-primary-600 mr-3 rounded-xl"
                      >
                        <Eye />
                        View
                      </Button>
                      <Button
                        onClick={() => setDeleteChildId(child.id)}
                        className="bg-red-700 hover:bg-red-600 rounded-xl"
                      >
                        <Trash2 />
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
      {deleteChildId !== null && (
        <ConfirmDialog
          full_name={
            children.find((child) => child.id === deleteChildId)?.profile
              ?.full_name || ""
          }
          handleClose={() => setDeleteChildId(null)}
          handleDelete={handleConfirmDelete}
          open={deleteChildId !== null}
        />
      )}
    </div>
  );
};

export default ChildrenManagement;
