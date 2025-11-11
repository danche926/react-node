import { useEffect, useRef } from "react";
import useUserStore from "@/store/useUserStore";

export function useRedirectIfAuth() {
  const user = useUserStore((state) => state.user);
  const loadUserFromStorage = useUserStore((state) => state.loadUserFromStorage);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadUserFromStorage();
      hasLoaded.current = true;
    }

    if (user) {
      // 已登录，跳转
      window.location.href = "/";
    }
  }, [user, loadUserFromStorage]);
}
