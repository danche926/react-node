import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const products = [
  { id: '1', name: "示例商品 A", price: 99, description: "测试商品 A", countInStock: 10,image: 'https://fastly.picsum.photos/id/263/200/300.jpg?hmac=_3gUXUjqs7PiEu_rAuPqS0Oa4X18Og5yS-C1HQ3KvtE' },
  { id: '2', name: "示例商品 B", price: 199, description: "测试商品 B", countInStock: 5, image: 'https://fastly.picsum.photos/id/338/200/200.jpg?hmac=5S5SeR5xW8mbN3Ml7wTTJPePX392JafhcFMGm7IFNy0' },
];

const importData = async () => {
  try {
    await Product.deleteMany(); // 清空已有数据
    await Product.insertMany(products);
    console.log("✅ 数据导入完成");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
