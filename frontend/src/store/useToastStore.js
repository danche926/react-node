import { create } from "zustand";

const useToastStore = create((set) => ({
  loading: false,
  toast: null,

  setLoading: (loading) => set({ loading }),
  setToast: (toast) => {
    set({ toast });
    if (toast) {
      setTimeout(() => set({ toast: null }), 3000); // 3 秒自动消失
    }
  },
}));

export default useToastStore;