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
import { Product } from "@prisma/client";
import { Edit, Eye, Plus } from "lucide-react";
import { useState } from "react";
import ProductForm from "./ProductForm";

type ProductDialogAddProps = {
  mode: Exclude<FormMode, "edit" | "view">;
  trigger?: React.ReactNode;
};

type ProductDialogEditViewProps = {
  mode: Exclude<FormMode, "add">;
  trigger?: React.ReactNode;
  product: Product;
};

type ProductDialogProps = ProductDialogAddProps | ProductDialogEditViewProps;

const ProductDialog = ({ mode, trigger, ...props }: ProductDialogProps) => {
  const [open, setOpen] = useState(false);

  const formText = {
    trigger: triggerTexts[mode],
    icon: iconComponents[mode],
    title: titleTexts[mode],
    description: descriptionTexts[mode],
  };

  let product: Product | undefined;

  if ("product" in props && (mode === "edit" || mode === "view")) {
    product = props.product;
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
        <ProductForm setOpen={setOpen} mode={mode} product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;

const triggerTexts: Record<FormMode, string> = {
  add: "Add New Product",
  edit: "Edit Product",
  view: "View Product",
};

const titleTexts: Record<FormMode, string> = {
  add: "Add Product",
  edit: "Edit Product",
  view: "View Product",
};

const descriptionTexts: Record<FormMode, string> = {
  add: "Fill out the form below to add new products!",
  edit: "Edit the form below to update the product details.",
  view: "View the product details below.",
};

const iconComponents: Record<FormMode, React.ReactNode> = {
  add: <Plus className="w-4 h-4 ml-2" />,
  edit: <Edit className="w-4 h-4 ml-2" />,
  view: <Eye className="w-4 h-4 ml-2" />,
};
