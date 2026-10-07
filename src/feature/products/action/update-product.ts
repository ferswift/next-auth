"use server";

import { auth } from "@/feature/lib/auth";
import { headers } from "next/headers";
import { productSchema, ProductSchema } from "../schema/product-schema";
import { prisma } from "@/feature/lib/prisma";
import { unauthorized } from "next/navigation";
import { revalidatePath } from "next/cache";

export const updateProduct = async (productId: string, data: ProductSchema) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    unauthorized();
  }

  // Validando os campos.
  const validatedFields = productSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid product data",
    };
  }

  // Trazendo produto vinculado ao usuário
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId: session.user.id,
      },
    });

    // validando a existência do produto
    if (!product) {
      return {
        success: false,
        error: "Product does not exist.",
      };
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: validatedFields.data,
    });

    revalidatePath("/products");

    return {
      success: true,
      product: updatedProduct,
    };
  } catch (error) {
    console.error("Error updating product", error);
    return {
      success: false,
      error: "error updating product",
    };
  }
};
