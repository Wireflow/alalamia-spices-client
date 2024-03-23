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
import AddExpense from "../Pages/Expenses/AddExpense";

const NewExpenseDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"lg"}>
          Add New Expense <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add</DialogTitle>
          <DialogDescription>
            Fill out the form below to add new expenses!
          </DialogDescription>
        </DialogHeader>
        <AddExpense setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewExpenseDialog;
