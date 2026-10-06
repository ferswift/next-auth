import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, {
    error: "Product name is Required",
  }),

  description: z.string().optional(),

  priceInCents: z.number().positive().min(1, {
    error: "Product price is Required",
  }),

  stock: z.number().nonnegative().min(1, {
    error: "Product stock is Required",
  }),
});

export type ProductSchema = z.infer<typeof productSchema>;
