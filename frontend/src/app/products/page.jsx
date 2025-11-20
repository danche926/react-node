"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore, useUIStore } from "@/store";
import Loading from "@/components/common/LoadingSpinner";
import Toast from "@/components/common/Toast";
import { productsList } from "@/services/productService";

// 引入自定义 SEO / UI 样式
import "@/styles/products.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { addToCart } = useCartStore();
  const { loading, setLoading, toast, setToast } = useUIStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await productsList();
        setProducts(res || []);
      } catch (err) {
        setError(true);
        setToast({ type: "error", message: "商品加载失败" });
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading, setToast]);

  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-center text-red-500 mt-8">
        加载商品出错，请稍后重试。
      </p>
    );

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 products-grid">
      {/* 全局提示 */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {/* 无数据 */}
      {products.length === 0 && (
        <p className="col-span-full text-center text-gray-500">
          暂无商品
        </p>
      )}

      {/* 商品列表 */}
      {products.map((p) => (
        <div
          key={p._id || p.id}
          tabIndex={0}
          className="p-4 bg-white rounded-xl shadow product-card flex flex-col justify-between"
        >
          <Link href={`/products/${p._id}`}>
            <div className="cursor-pointer">
              <Image
                src={p.image || "/image/icon.png"}
                alt={p.name}
                width={300}
                height={200}
                className="w-full h-40 object-contain rounded product-image"
              />
              <h3 className="product-title">{p.name}</h3>
            </div>
          </Link>

          <div className="mt-2">
            <p className="product-price">￥{p.price}</p>

            <button
              onClick={() => {
                addToCart(p);
                setToast({ type: "success", message: "已加入购物车" });
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-lg add-btn"
            >
              加入购物车
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
