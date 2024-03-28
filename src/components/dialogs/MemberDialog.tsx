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
import MemberForm from "../members/MemberForm";
import { Member } from "@prisma/client";

type MemberDialogAddProps = {
  mode: Exclude<FormMode, "edit" | "view">;
  trigger?: React.ReactNode;
};

type MemberDialogEditViewProps = {
  mode: Exclude<FormMode, "add">;
  trigger?: React.ReactNode;
  member: Member;
};

type MemberDialogProps = MemberDialogAddProps | MemberDialogEditViewProps;

const MemberDialog = ({ mode, trigger, ...props }: MemberDialogProps) => {
  const [open, setOpen] = useState(false);

  const formText = {
    trigger: triggerTexts[mode],
    icon: iconComponents[mode],
    title: titleTexts[mode],
    description: descriptionTexts[mode],
  };

  let member: Member | undefined;

  if ("member" in props && (mode === "edit" || mode === "view")) {
    member = props.member;
  }

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
