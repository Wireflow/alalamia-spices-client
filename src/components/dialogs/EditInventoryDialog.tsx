import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import NewProductForm from "../forms/NewProductForm";
import { Product } from "@prisma/client";

type Props = {
    product: Product;
  };
  

const EditInventoryDialog = ({product}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button size={"lg"}>
          <Edit className="w-[18px] h-[18px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Change any of the Product's data and hit save!
          </DialogDescription>
        </DialogHeader>
        <NewProductForm setOpen={setOpen} isEdit product={product}/>
      </DialogContent>
    </Dialog>
  );
};

export default EditInventoryDialog;
