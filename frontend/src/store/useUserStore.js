"use client";

import { create } from "zustand";
import { registerUser, loginUser } from "@/services/userService";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // 注册用户
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await registerUser(data);
      set({ user, loading: false });

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  // 登录
  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = await loginUser(data);
      set({ user, loading: false });

      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(user));
      }
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },
  
  // 登出
  logout: () => {
    set({ user: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("userInfo");
    }
  },

  // 从 localStorage 恢复用户状态（SSR 安全）
  loadUserFromStorage: () => {
    if (typeof window === "undefined") return;
    const user = localStorage.getItem("userInfo");
    if (user) {
      set({ user: JSON.parse(user) });
    }
  },
}));

export default useUserStore;
