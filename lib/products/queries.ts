import { prisma } from "../prisma";

export async function getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
  });
}
