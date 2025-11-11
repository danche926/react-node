import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 获取所有商品
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "获取商品列表失败", err });
  }
});

// 根据 ID 获取单个商品
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("商品未找到");
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "获取商品详情失败", err });
  }
});

export default router;
