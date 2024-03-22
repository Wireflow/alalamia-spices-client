import z from "zod";

export const TransactionSchema = z.object({
  totalAmount: z.number(),
  paymentMethod: z.enum(["CASH", "CARD", "CHECK"]),
  memberId: z.string(),
  products: z
    .object({
      id: z.string(),
    })
    .array(),
});
