"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItem = (href, label) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md transition ${
        pathname === href
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-blue-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm border-b mb-6">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🛒 电商系统
        </Link>
        <div className="space-x-4">
          {navItem("/", "首页")}
          {navItem("/products", "商品列表")}
          {navItem("/cart", "购物车")}
        </div>
      </div>
    </nav>
  );
}
