import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import NewMemberForm from "../forms/NewMemberForm";

type Props = {
  isVisible: boolean;
  isOpen?: boolean;
};

const NewMemberDialog = ({ isVisible = true, isOpen }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {isVisible ? (
          <Button size={"lg"}>
            Add New Member <Plus className="w-4 h-4 ml-2" />
          </Button>
        ) : null}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New member</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new member!
          </DialogDescription>
        </DialogHeader>
        <NewMemberForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewMemberDialog;
