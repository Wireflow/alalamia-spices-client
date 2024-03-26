import z from "zod";

export const TransactionSchema = z.object({
  totalAmount: z.number(),
  paymentMethod: z.enum(["CASH", "CHECK", "CARD"]),
  checkNumber: z.number().optional(),
  checkAmount: z.number().optional(),
  totalQuantityPurchased: z.number(),
  memberId: z.string(),
  purchasedProducts: z
    .object({
      productId: z.string(),
      purchaseQuantity: z.number(),
      price: z.number().optional(),
      name: z.string(),
    })
    .array(),
});

export const PurchasedProductSchema = z.object({
  productId: z.string(),
  purchaseQuantity: z.number(),
  price: z.number(),
  name: z.string(),
});

export type PurchasedProductType = z.infer<typeof PurchasedProductSchema>;

export type TransactionType = z.infer<typeof TransactionSchema>;
