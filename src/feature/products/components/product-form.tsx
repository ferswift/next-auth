"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema } from "../schema/product-schema";
import { createProduct } from "../action/create-product";
import { Product } from "../types/product";
import { updateProduct } from "../action/update-product";

type ProductFormValues = z.output<typeof productSchema>;

interface ProductFormProps {
  product?: Product;
}

export const ProductForm = ({ product }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      priceInCents: product?.priceInCents ?? 0,
      stock: product?.stock ?? 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    if (product) {
      await updateProduct(product.id, data);
    } else {
      await createProduct(data);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {product ? "Edit product" : "Create product"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a new product to your inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Name
          </label>

          <input
            id="name"
            {...register("name")}
            placeholder="Ex: Mechanical Keyboard"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium leading-none"
          >
            {product
              ? "Update the product information."
              : "Add a new product to your inventory."}
          </label>

          <textarea
            id="description"
            {...register("description")}
            placeholder="Describe your product..."
            rows={4}
            className="flex min-h-24 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="priceInCents"
              className="text-sm font-medium leading-none"
            >
              Price
            </label>

            <input
              id="priceInCents"
              type="number"
              step="1"
              {...register("priceInCents", {
                valueAsNumber: true,
              })}
              placeholder="Ex: 4990"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <p className="text-xs text-muted-foreground">
              Enter the value in cents. Example: R$ 49,90 = 4990.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="stock" className="text-sm font-medium leading-none">
              Stock
            </label>

            <input
              id="stock"
              type="number"
              {...register("stock", {
                valueAsNumber: true,
              })}
              placeholder="Ex: 10"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {product ? "Edit Product" : "Create Product"}
        </button>
        {errors.name && (
          <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
        )}
        {errors.description && (
          <p className="mt-2 text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
        {errors.priceInCents && (
          <p className="mt-2 text-sm text-destructive">
            {errors.priceInCents.message}
          </p>
        )}
        {errors.stock && (
          <p className="mt-2 text-sm text-destructive">
            {errors.stock.message}
          </p>
        )}
      </form>
    </div>
  );
};
