import api from "./api";

const productService = {
  getAll: () => api.get("/products"),
};

export default productService;
