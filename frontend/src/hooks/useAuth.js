"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { user, loadUserFromStorage } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    loadUserFromStorage();
    if (!user) router.push("/login");
  }, [user]);
};
