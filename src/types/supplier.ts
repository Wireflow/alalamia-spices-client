import z from "zod";

export const SupplierSchema = z.object({
  name: z.string(),
  owedBalance: z.number().optional(),
});
