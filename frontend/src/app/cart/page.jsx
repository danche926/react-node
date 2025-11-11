"use client";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();
  const router = useRouter();

  if (cart.length === 0)
    return <p className="text-center mt-20 text-gray-500">购物车为空</p>;

  const handleCheckout = () => {
    router.push("/checkout"); // 跳转到下单确认页
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">🛒 我的购物车</h2>
      {cart.map((item) => (
        <div
          key={item.id} 
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-gray-500 text-sm">￥{item.price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                updateQuantity(item.id, Math.max(item.quantity - 1, 1))
              }
              className="px-2 border rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="px-2 border rounded"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 text-sm ml-4"
            >
              删除
            </button>
          </div>
        </div>
      ))}

      <div className="mt-4 flex justify-between items-center">
        <div className="font-bold text-lg">
          总价：￥{getTotalPrice().toFixed(2)}
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          去下单
        </button>
      </div>
    </div>
  );
}
