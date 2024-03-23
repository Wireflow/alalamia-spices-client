import { ProductSchema, ProductType } from "@/types/product";
import submitNewProduct from "@/use-cases/submitNewProduct";
import updateProduct from "@/use-cases/updateProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "@/src/components/ui/textarea";

type NewProductFormProps = {
  setOpen: (isOpen: boolean) => void;
  isEdit?: boolean;
  product?: Product;
};

const NewProductForm = ({
  setOpen,
  isEdit = false,
  product,
}: NewProductFormProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: isEdit ? updateProduct : submitNewProduct,
    onSuccess: () => {
      setOpen(false);
      return queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: product?.id ? product.id : undefined,
      name: product?.name ? product.name : undefined,
      description: product?.description ? product.description : undefined,
      price: product?.price ? product.price : undefined,
      boxQuantity: product?.boxQuantity ? product.boxQuantity : undefined,
      quantity: product?.quantity ? product.quantity : undefined,
      grams: product?.grams ? product.grams : undefined,
      sku: product?.sku ? product.sku : undefined,
      supplierId: product?.supplierId ? product.supplierId : undefined,
    },
  });

  const onSubmit = async (data: ProductType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full">
        <div className="grid gap-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className=" flex-[0.5]">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="boxQuantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Boxes</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quantity Per Box</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grams"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Grams</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplierId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} className="max-h-[150px]" rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={isPending}>
            {isPending
              ? isEdit
                ? "Saving..."
                : "Adding..."
              : isEdit
              ? "Save Changes"
              : "Add"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewProductForm;
