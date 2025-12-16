import { PrismaClient, Prisma } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

type ProductInput = Prisma.ProductCreateManyInput;

async function main() {
  const filePath = path.join(process.cwd(), "products.json");
  const raw = fs.readFileSync(filePath, "utf-8");

  const products = JSON.parse(raw) as ProductInput[];

  await prisma.product.createMany({
    data: products.map(({ id, createdAt, ...rest }) => rest),
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log("✅ Products imported into Neon"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
