"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useRedirectIfAuth } from "@/hooks/useRedirectIfAuth";

export default function LoginPage() {
  const { login, loading, error } = useUserStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // 已登录则直接跳转
  useRedirectIfAuth("/");

  // 页面加载时读取 localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const rememberedEmail = localStorage.getItem("rememberEmail");
      const rememberedPassword = localStorage.getItem("rememberPassword");
      if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRemember(true);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 登录请求
    await login({ email, password });
    router.push("/"); // 登录成功后跳首页

    // 保存账号密码
    if (remember) {
      localStorage.setItem("rememberEmail", email);
      localStorage.setItem("rememberPassword", password);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">登录</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        {/* 勾选记住账号密码 */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            记住账号密码
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  );
}
