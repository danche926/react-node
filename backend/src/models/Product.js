import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    countInStock: { type: Number, default: 0 },
  },
  {
    timestamps: true, // 自动添加 createdAt 和 updatedAt
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
