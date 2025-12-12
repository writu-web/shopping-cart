import { prisma } from "@/lib/prisma";
import Link from "next/link";
import MegaMenu from "./megaMenu";

export default async function DesktopNavbar() {
  const categories = await prisma.category.findMany({
    include: {
      children: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <nav className="hidden md:flex items-center gap-6 border-b py-3">
      {categories.map(category => (
        <MegaMenu key={category.id} category={category} />
      ))}
    </nav>
  );
}
