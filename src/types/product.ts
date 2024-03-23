import z from "zod";

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  boxQuantity: z.number().optional(),
  quantity: z.number().optional(),
  grams: z.number().optional(),
  sku: z.string().optional(),
  supplierId: z.string().optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
