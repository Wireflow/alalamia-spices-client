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
import AddEditViewExpenseForm from "../forms/ExpenseForm";

type ExpenseDialogProps = {
  mode: FormMode;
  trigger?: React.ReactNode;
};

const ExpenseDialog = ({ mode, trigger }: ExpenseDialogProps) => {
  const [open, setOpen] = useState(false);

  const formText = {
    trigger: triggerTexts[mode],
    icon: iconComponents[mode],
    title: titleTexts[mode],
    description: descriptionTexts[mode],
  };

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
        <AddEditViewExpenseForm setOpen={setOpen} mode={mode} />
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDialog;

const triggerTexts: Record<FormMode, string> = {
  add: "Add New Expense",
  edit: "Edit Expense",
  view: "View Expense",
};

const titleTexts: Record<FormMode, string> = {
  add: "Add Expense",
  edit: "Edit Expense",
  view: "View Expense",
};

const descriptionTexts: Record<FormMode, string> = {
  add: "Fill out the form below to add new expenses!",
  edit: "Edit the form below to update the expense details.",
  view: "View the expense details below.",
};

const iconComponents: Record<FormMode, React.ReactNode> = {
  add: <Plus className="w-4 h-4 ml-2" />,
  edit: <Edit className="w-4 h-4 ml-2" />,
  view: <Eye className="w-4 h-4 ml-2" />,
};
