"use client";

import { useEffect } from "react";
import { useUserStore, useUIStore } from "@/store";
import Navbar from "@/components/common/Navbar";
import Toast from "@/components/common/Toast";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ClientLayout({ children }) {
  const { loading, toast } = useUIStore();
  const loadUserFromStorage = useUserStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage(); // ✅ 只执行一次，避免无限循环
  }, [loadUserFromStorage]);

  return (
    <>
      <Navbar />
      {loading && <LoadingSpinner />}
      {toast && (
        <Toast
          {...toast}
          onClose={() => useUIStore.getState().setToast(null)}
        />
      )}
      <main>{children}</main>
    </>
  );
}
