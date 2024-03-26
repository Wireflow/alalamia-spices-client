import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Member } from "@prisma/client";
import { Edit } from "lucide-react";
import { useState } from "react";
import NewMemberForm from "../forms/NewMemberForm";

type Props = {
  member: Member;
};

const EditMemberDialog = ({ member }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"icon"} variant={"secondary"}>
          <Edit className="w-[18px] h-[18px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
          <DialogDescription>
            Change any of the member's data and hit save!
          </DialogDescription>
        </DialogHeader>
        <NewMemberForm setOpen={setOpen} isEdit member={member} />
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;
