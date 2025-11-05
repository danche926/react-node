import Product from "../models/Product.js";
import { success, error } from "../utils/response.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    success(res, products, "商品列表获取成功");
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await Product.create({ name, price, stock });
    success(res, newProduct, "商品添加成功");
  } catch (err) {
    next(err);
  }
};
