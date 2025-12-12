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

export async function getProductBySlug(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,       // MUST include
      images: true,
      attributes: true,
      reviews: true,
      subSubCategory: {
      include: {
          subcategory: {
          include: {
              category: true,
          },
          },
      },
      },
    },
  });

  if (!product) return null;

  return {
      ...product,
       variants: product.variants.map(v => ({
      ...v,
      price: v.price.toNumber(),
    }))
  }
}
