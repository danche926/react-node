import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

// 生成 JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// 注册
router.post(
  "/register",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
      const existUser = await User.findOne({ email });
      if (existUser) return res.status(400).json({ message: "用户已存在" });

      const user = await User.create({ name, email, password });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (err) {
      res.status(500).json({ message: "注册失败", error: err.message });
    }
  }
);

// 登录
router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: "用户不存在" });

      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: "密码错误" });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (err) {
      res.status(500).json({ message: "登录失败", error: err.message });
    }
  }
);

export default router;
