import { Category, SubCategory } from "@prisma/client";

export interface NavCategory extends Category {
  children?: SubCategory[];
}