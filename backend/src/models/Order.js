import mongoose from "mongoose";

// 子文档：订单项
const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

// 主文档：订单
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    items: [orderItemSchema], // ✅ 使用子文档结构

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "去支付" },
  },
  { timestamps: true } // ✅ 自动加 createdAt 和 updatedAt
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
