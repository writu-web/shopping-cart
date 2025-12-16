import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  fs.writeFileSync("products.json", JSON.stringify(products, null, 2));
}

main();
