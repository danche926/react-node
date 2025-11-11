"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCartStore, useUIStore } from "@/store";
import Loading from "@/components/common/LoadingSpinner";
import Toast from "@/components/common/Toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const {toast, setToast} = useUIStore();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("加载商品详情失败");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setToast({ type: "error", message: "商品加载失败" });
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return <p className="text-center text-gray-500">商品不存在</p>;

  const handleAddToCart = () => {
    addToCart(product);
    setToast({ type: "success", message: "已加入购物车" });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image || "/image/icon.png"}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-lg shadow-md object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description || "暂无描述"}</p>
          <p className="text-2xl font-semibold text-green-600">
            ¥{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            加入购物车
          </button>
        </div>
      </div>
    </div>
  );
}
