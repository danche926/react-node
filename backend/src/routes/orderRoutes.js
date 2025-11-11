import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/orders  提交订单
router.post(
  "/",
  protect, // 受保护接口，需要登录
  asyncHandler(async (req, res) => {
    const { items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      res.status(400);
      throw new Error("没有商品可提交订单");
    }
    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

// GET /api/orders/:id  查看订单详情
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
      res.status(404);
      throw new Error("订单不存在");
    }

    // 构建返回对象
    const response = {
      _id: order._id,
      user: order.user,                     // 包含 name 和 email
      items: order.items.map(item => ({
        product: item.product,              // product id
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: order.shippingAddress, // ✅ 确保返回
      paymentMethod: order.paymentMethod,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };

    res.json(response);
  })
);


// GET /api/orders/user/:userId  查看用户所有订单
router.get(
  "/user/:userId",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  })
);

export default router;
