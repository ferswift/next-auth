"use server";

import { prisma } from "@/feature/lib/prisma";
import { ProductSchema, productSchema } from "../schema/product-schema";
import { auth } from "@/feature/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const createProduct = async (data: ProductSchema) => {
  // Pegando a sessão do usuário logado, caso não esteja logado joga um error
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User not authenticated");
  }

  // validando os campos do formulário com o schema do zod.
  const validatedFields = productSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: "error validating fields",
    };
  }

  // desestruturando os campos validados para criar o produto no banco de dados
  const { name, description, priceInCents, stock } = validatedFields.data;

  try {
    // criando lógica para adicionar produto ao banco de dados

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        priceInCents,
        stock,
        userId: session.user.id,
      },
    });

    revalidatePath("/products");

    // retornando o produto criado com sucesso
    return {
      success: true,
      product: newProduct,
    };
  } catch (error) {
    console.error("Error creating product", error);

    return {
      success: false,
      errors: "error creating product",
    };
  }
};
