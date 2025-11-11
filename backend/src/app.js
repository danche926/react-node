import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// 先连接数据库
connectDB();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 路由
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// 错误处理
app.use(errorHandler);

// 不启动服务，直接导出 app
export default app;
