"use client";

import Link from "next/link";
import { ProductType } from "@/types/product";

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-lg transition-all">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 mb-4 rounded-md overflow-hidden">
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>

        <h2 className="font-semibold text-lg">{product.name}</h2>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <p className="font-bold text-md mt-2">
          ₹{(product.priceCents / 100).toLocaleString()}
        </p>
      </Link>
    </div>
  );
}
