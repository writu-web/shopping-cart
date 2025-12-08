export interface ProductType {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  priceCents: number;
  image?: string | null;
  inventory: number;
}
