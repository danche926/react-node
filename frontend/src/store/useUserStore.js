import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      isLoggedIn: () => !!useUserStore.getState().token,
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
