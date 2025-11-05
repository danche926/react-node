import { create } from "zustand";

const useUIStore = create((set) => ({
  loading: false,
  modalVisible: false,
  toast: null,

  setLoading: (loading) => set({ loading }),
  showModal: () => set({ modalVisible: true }),
  hideModal: () => set({ modalVisible: false }),
  showToast: (message) => set({ toast: message }),
  clearToast: () => set({ toast: null }),
}));

export default useUIStore;
