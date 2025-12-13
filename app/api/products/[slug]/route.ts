import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  slug: string;
}

export async function GET(request: NextRequest, { params }: {params: { slug: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: params.slug,  
        },
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
    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }   
    return NextResponse.json({
      ...product,
       variants: product.variants.map(v => ({
      ...v,
      price: v.price.toNumber(),
    }))
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}