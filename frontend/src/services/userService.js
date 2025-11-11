// src/services/userService.js
import api from "./api";
import { setToken } from '@/utils/storage'

export const registerUser = async (data) => {
  // 返回 { _id, name, email }，不暴露密码
  return await api.post("/users/register", data);
};

export const loginUser = async (data) => {
  const user = await api.post("/users/login", data);
  // 登录成功后存 token
  if (user.token) {
    setToken(user.token);
  }
  return user;
};

export const getUserProfile = async () => {
  return await api.get("/users/profile"); // 受保护接口
};
