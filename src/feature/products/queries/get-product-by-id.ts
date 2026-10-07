import { prisma } from "@/feature/lib/prisma";

export const getProductById = async (productId: string, userId: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        userId,
      },
    });

    return {
      success: true,
      product,
    };
  } catch (error) {
    console.error("Error fecthing product by id", error);

    return {
      success: false,
      error: "error fecthing product by id",
    };
  }
};
