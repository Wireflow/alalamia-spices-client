import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSelectMemberStore } from "@/store/useSelectMemberStore";
import { Plus } from "lucide-react";
import SelectMemberForm from "../forms/SelectMemberForm";

const SelectMemberDialog = () => {
  const { isDialogOpen, setDialogOpen } = useSelectMemberStore();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="w-full">
        <Button size={"lg"} variant={"outline"} className="w-full">
          Select Member <Plus className="w-4 h-4 ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Member</DialogTitle>
          <DialogDescription>
            ou can filter members by address or phone number using the drop down
            on the right.
          </DialogDescription>
        </DialogHeader>
        <SelectMemberForm />
      </DialogContent>
    </Dialog>
  );
};

export default SelectMemberDialog;
