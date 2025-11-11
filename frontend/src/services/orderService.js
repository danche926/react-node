// src/services/orderService.js
import api from "./api";

// 提交订单
export const createOrder = async (orderData) => {
  return await api.post("/orders", orderData);
};

// 获取单个订单详情
export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

// 获取用户订单列表
export const getUserOrders = async (userId) => {
  return await api.get(`/orders/user/${userId}`);
};
