import { Product, Category, SubCategory } from "@prisma/client";

export interface ProductWithCategory extends Product {
  category: Category | null;
  subCategory: SubCategory | null;  
}


