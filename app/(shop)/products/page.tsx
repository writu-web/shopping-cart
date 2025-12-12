import ProductCard from "../../../components/products/productCard";
import { getAllProducts } from "@/lib/products/queries";

export const dynamic = "force-dynamic"; // ensures fresh products

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {products.length === 0 && (
        <p className="text-gray-500">No products available.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    </main>
  );
}
