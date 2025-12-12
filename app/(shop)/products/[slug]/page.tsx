import React, { cache } from "react";
import Image from "next/image";
import { getProductBySlug } from "@/lib/products/queries";
import Link from "next/link";

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const { slug } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/${slug}`, { cache: "no-cache" });

  if (!res.ok) {
    return {
      title: "Product Not Found | eKart",
      description: "This product does not exist.",
      alternates: { canonical: `${baseUrl}/products/${slug}` },
    };
  }

  const product = await res.json();

  return {
    title: `${product.name} | eKart`,
    description: product.description,
    openGraph: {
      title: `${product.name} | eKart`,
      description: product.description,
      images: [product.imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | eKart`,
      description: product.description,
      images: [product.imageUrl],
    },
    alternates: { canonical: `${baseUrl}/products/${slug}` },
}

}
export default async function ProductDetailPage({params}: {params: Promise<{slug: string}>}) {
  const { slug } = await params;
  console.log("Fetching product with slug:", slug);
  const product = await getProductBySlug(slug);
  console.log("Product found:", product);

  if (!product) {
    return <div>Product not found for slug: {slug}</div>;
  }

  return (
        <div className="container mx-auto px-4 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Product Image */}
         
            <div>
                <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                {/* <p className="text-2xl font-bold mb-6">₹{product.price.toString()}</p> */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                    className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                    >
                    Add to Cart
                    </button>
                    <Link
                    href="/products"
                    className="px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
                    >
                    Back to Products
                    </Link>
                </div>
                {/* <div>
                    <p className="text-sm text-gray-500">
                        Category: {product.category?.name || "Uncategorized"}
                    </p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                </div> */}
            </div>
        </div>
    </div>
);
}