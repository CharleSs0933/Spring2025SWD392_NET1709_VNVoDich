import { Dialog, DialogHeader } from "@/components/ui/dialog";

type ConfirmDialogProps = {
  full_name: string;
  handleClose: () => void;
};

export const ConfirmDialog = ({
  full_name,
  handleClose,
}: ConfirmDialogProps) => {
  return (
    <Dialog>
      <DialogHeader>Confirm Delete</DialogHeader>
      <p></p>
    </Dialog>
  );
};
