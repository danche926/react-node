import { create } from "zustand";

const useUIStore = create((set) => ({
  loading: false,
  modalVisible: false,
  toast: null,

  setLoading: (loading) => set({ loading }),
  setToast: (toast) => {
    set({ toast });
    if (toast) {
      setTimeout(() => set({ toast: null }), 3000); // 3 秒自动消失
    }
  },
  showModal: () => set({ modalVisible: true }),
  hideModal: () => set({ modalVisible: false }),
  showToast: (message) => set({ toast: message }),
  clearToast: () => set({ toast: null }),
}));

export default useUIStore;
