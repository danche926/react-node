import Order from "../models/Order.js";

// 创建订单
export const createOrder = async (req, res, next) => {
  try {
    const { user, items, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "购物车为空" });
    }

    const order = await Order.create({
      user,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

// 获取单个订单
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "订单不存在" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// 获取用户订单
export const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};
