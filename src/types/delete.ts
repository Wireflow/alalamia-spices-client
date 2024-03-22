import z from "zod";

export const DeleteSchema = z.object({
  id: z.string(),
});
