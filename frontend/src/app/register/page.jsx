"use client";

import { useState } from "react";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useRedirectIfAuth } from "@/hooks/useRedirectIfAuth";

export default function RegisterPage() {
  const { register, loading, error } = useUserStore();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 已登录则直接跳转
  useRedirectIfAuth("/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    router.push("/login"); // 注册成功后跳首页
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">注册</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="密码（至少6位）"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "注册中..." : "注册"}
        </button>
      </form>
    </div>
  );
}
