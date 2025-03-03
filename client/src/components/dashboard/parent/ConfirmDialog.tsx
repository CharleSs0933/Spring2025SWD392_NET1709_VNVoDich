import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";

type ConfirmDialogProps = {
  full_name: string;
  handleClose: () => void;
  handleDelete: () => void;
  open: boolean;
};

export const ConfirmDialog = ({
  full_name,
  handleClose,
  handleDelete,
  open,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="dialog_content">
        <DialogHeader className="dialog_title text-lg font-semibold">
          Confirm Delete
        </DialogHeader>
        <p className="text-gray-700 text-base">
          Are you sure you want to delete {full_name}?
        </p>
        <div className="flex justify-end gap-3">
          <Button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="bg-red-700 hover:bg-red-600"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
