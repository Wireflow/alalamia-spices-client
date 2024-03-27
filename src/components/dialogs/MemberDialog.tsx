import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormMode } from "@/types/form";
import { Edit, Eye, Plus } from "lucide-react";
import { useState } from "react";
import MemberForm from "../forms/MemberForm";
import { Member } from "@prisma/client";

type MemberDialogProps =
  | {
      mode: Exclude<FormMode, "edit">;
      trigger?: React.ReactNode;
    }
  | {
      mode: "edit";
      trigger?: React.ReactNode;
      member: Member;
    };

const MemberDialog = ({ mode, trigger, ...props }: MemberDialogProps) => {
  const [open, setOpen] = useState(false);

  const formText = {
    trigger: triggerTexts[mode],
    icon: iconComponents[mode],
    title: titleTexts[mode],
    description: descriptionTexts[mode],
  };

  const member =
    "member" in props && mode === "edit" ? props.member : undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {trigger ? (
          trigger
        ) : (
          <Button size={"lg"}>
            {formText.trigger} {formText.icon}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{formText.title}</DialogTitle>
          <DialogDescription>{formText.description}</DialogDescription>
        </DialogHeader>
        <MemberForm setOpen={setOpen} mode={mode} member={member} />
      </DialogContent>
    </Dialog>
  );
};

export default MemberDialog;

const triggerTexts: Record<FormMode, string> = {
  add: "Add New Member",
  edit: "Edit Member",
  view: "View Member",
};

const titleTexts: Record<FormMode, string> = {
  add: "Add Member",
  edit: "Edit Member",
  view: "View Member",
};

const descriptionTexts: Record<FormMode, string> = {
  add: "Fill out the form below to add new members!",
  edit: "Edit the form below to update the member details.",
  view: "View the member details below.",
};

const iconComponents: Record<FormMode, React.ReactNode> = {
  add: <Plus className="w-4 h-4 ml-2" />,
  edit: <Edit className="w-4 h-4 ml-2" />,
  view: <Eye className="w-4 h-4 ml-2" />,
};
