import Link from "next/link";

export default function HomePage() {
  return (
    <section className="text-center py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        欢迎来到电商系统
      </h1>
      <p className="text-gray-600 mb-8">
        这是一个基于 Next.js + React 的前后端分离电商项目。
      </p>
      {/* <Link
        href="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        查看商品列表
      </Link> */}
       {/* <Link
        href="/cart"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        cart
      </Link> */}
    </section>
  );
}
