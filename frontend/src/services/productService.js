import api from "./api";

export const productsList = async (data) => {
  // 返回 { _id, name, email }，不暴露密码
  return await api.get("/products", data);
};
