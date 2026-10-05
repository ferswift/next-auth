import { prisma } from "@/feature/lib/prisma";
import { Product } from "../types/product";

export const getProducts = async (userId: string): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId,
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};
