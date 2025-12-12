"use client";

import { useState } from "react";
import Link from "next/link";

export default function MegaMenu({ category }:{category: any}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="uppercase text-sm font-semibold tracking-wide">
        {category.name}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-[600px] bg-white shadow-lg p-4">
          <div className="grid grid-cols-3 gap-4">
            {category.children.map(({sub}:{sub: any}) => (
              <Link key={sub.id} href={`/products?category=${sub.slug}`}>
                <p className="text-sm hover:text-pink-600 cursor-pointer">
                  {sub.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
