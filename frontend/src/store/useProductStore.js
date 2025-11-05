import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  selectedProduct: null,

  setProducts: (products) => set({ products }),
  selectProduct: (product) => set({ selectedProduct: product }),

  fetchProducts: async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      set({ products: data });
    } catch (err) {
      console.error("加载商品失败:", err);
    }
  },
}));

export default useProductStore;
