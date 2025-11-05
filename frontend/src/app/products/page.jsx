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
import { useProductStore, useCartStore, useUIStore } from "@/store";

export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const { setLoading } = useUIStore();

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    })();
  }, [fetchProducts, setLoading]);

  return (
    <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id || p._id}
          className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
        >
          <img
            src={p.image || "../image/icon.png"}
            alt={p.name}
            className="h-20 object-cover rounded"
          />
          <h3 className="mt-2 text-sm font-medium">{p.name}</h3>
          <p className="text-gray-500 text-sm">￥{p.price}</p>
          <button
            onClick={() => addToCart(p)}
            className="mt-2 w-full bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600"
          >
            加入购物车
          </button>
        </div>
      ))}
    </div>
  );
}
