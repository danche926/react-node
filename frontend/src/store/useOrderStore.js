import { create } from "zustand";
import { createOrder, getOrderById, getUserOrders } from "@/services/orderService";

const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  placeOrder: async (orderData, clearCart) => {
    set({ loading: true, error: null });
    try {
      const order = await createOrder(orderData);
      set({ currentOrder: order, loading: false });
      // 下单成功清空购物车
      clearCart?.();
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const order = await getOrderById(id);
      set({ currentOrder: order, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },

  fetchUserOrders: async (userId) => {
    set({ loading: true, error: null });
    try {
      const orders = await getUserOrders(userId);
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || err.message, loading: false });
    }
  },
}));

export default useOrderStore;
