"use client";

import Link from "next/link";
import { useCartStore, useUserStore, useUIStore } from "@/store";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/storage";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setToast } = useUIStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
    removeToken();
    setToast({ type: "success", message: "已退出登录" });
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50 border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
          商品首页
        </h1>
      </Link>

      {/* 右侧菜单 */}
      <div className="flex items-center space-x-4">
        {/* 商品列表 */}
        <Link
          href="/products"
          className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          商品列表
        </Link>

        {/* 购物车 */}
        <Link
          href="/cart"
          className="relative px-5 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all shadow-sm hover:shadow-md"
        >
          购物车
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-semibold shadow">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Link>

        {/* 登录/注册 或 用户信息 */}
        {!user ? (
          <>
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 text-sm font-medium bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-sm hover:shadow-md"
            >
              注册
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">欢迎, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm hover:shadow-md"
            >
              退出
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
