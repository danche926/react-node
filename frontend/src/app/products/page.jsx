// "use client";
// import { useState, useEffect } from "react";
// import productService from "@/services/productService";
// import LoadingSpinner from "@/components/common/LoadingSpinner";

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     productService
//       .getAll()
//       .then((res) => {
//         setProducts(res.data || res); // 支持两种返回格式
//       })
//       .catch((err) => console.error("加载商品失败：", err))
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading)
//     return <LoadingSpinner text="正在加载商品列表..." />;

//   if (!products.length)
//     return (
//       <div className="text-center text-gray-500">
//         暂无商品，请稍后再试。
//       </div>
//     );

//   return (
//     <section>
//       <h2 className="text-2xl font-bold mb-6">商品列表</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((p) => (
//           <div
//             key={p.id || p._id}
//             className="border bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
//           >
//             <h3 className="font-semibold text-lg mb-2">{p.name}</h3>
//             <p className="text-gray-600 mb-2">价格：¥{p.price}</p>
//             <p className="text-sm text-gray-400">
//               库存：{p.stock ?? "未知"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProductStore, useCartStore, useUIStore } from "@/store";
import Loading from "@/components/common/LoadingSpinner";
import Toast from "@/components/common/Toast";

export default function ProductsPage() {
  const { products, fetchProducts, error } = useProductStore();
  const { addToCart } = useCartStore();
  const { loading, setLoading, toast, setToast } = useUIStore();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (err) {
        console.error("获取商品失败", err);
        setToast({ type: "error", message: "商品加载失败" });
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchProducts, setLoading, setToast]);

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500">加载商品出错，请稍后重试。</p>
    );

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      {products.length === 0 ? (
        <p className="col-span-full text-center text-gray-500">暂无商品</p>
      ) : (
        products.map((p) => (
          <div
            key={p._id || p.id}
            className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
          >
            <Link href={`/products/${p._id}`}>
              <div className="cursor-pointer">
                <Image
                  src={p.image || "/image/icon.png"}
                  alt={p.name}
                  width={300}
                  height={200}
                  className="w-full h-40 object-contain rounded"
                />
                <h3 className="mt-2 text-base font-semibold">{p.name}</h3>
              </div>
            </Link>

            <div className="mt-2">
              <p className="text-gray-600 text-sm mb-2">￥{p.price}</p>
              <button
                onClick={() => {
                  addToCart(p);
                  setToast({ type: "success", message: "已加入购物车" });
                }}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                加入购物车
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
