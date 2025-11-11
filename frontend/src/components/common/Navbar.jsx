"use client";

import Link from "next/link";
import { useCartStore, useUserStore, useUIStore } from "@/store";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const { setToast } = useUIStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/login");
    localStorage.removeItem("authToken");
    setToast({ type: "success", message: "已退出登录" });
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer">
          商品首页
        </h1>
      </Link>

      {/* 右侧菜单 */}
      <div className="flex items-center space-x-4">
        {/* 购物车 */}
        <Link href="/cart" className="relative">
          <div className="flex items-center cursor-pointer hover:text-blue-600 transition">
            <span className="material-icons text-2xl">购物车</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-semibold shadow">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </Link>

        {/* 登录/注册 或 用户信息 */}
        {!user ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition rounded-md border border-gray-200 hover:border-blue-500"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              注册
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700 font-medium">欢迎, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm"
            >
              退出
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
