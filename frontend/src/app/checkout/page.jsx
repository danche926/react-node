"use client";

import { useState, useEffect } from "react";
import { useCartStore, useUserStore, useUIStore, useOrderStore } from "@/store";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/LoadingSpinner";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const { user } = useUserStore();
  const { placeOrder, loading, error } = useOrderStore();
  const { setToast } = useUIStore();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("模拟支付");

  useEffect(() => {
    if (!user) router.push("/login"); // 未登录跳转登录
  }, [user, router]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    await placeOrder(
      { items: cart, shippingAddress, paymentMethod, totalPrice },
      clearCart // 下单成功清空购物车
    );
    setToast({ type: "success", message: "订单提交成功" });
    router.push("/orders"); // 跳转订单列表
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">订单确认</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 收货地址 */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">收货地址</h2>
        <input
          type="text"
          placeholder="地址"
          className="w-full p-2 border rounded mb-2"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="城市"
          className="w-full p-2 border rounded mb-2"
          value={shippingAddress.city}
          onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="邮编"
          className="w-full p-2 border rounded mb-2"
          value={shippingAddress.postalCode}
          onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
        />
        <input
          type="text"
          placeholder="国家"
          className="w-full p-2 border rounded"
          value={shippingAddress.country}
          onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
        />
      </div>

      {/* 购物车商品 */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">商品清单</h2>
        {cart.map((item) => (
          <div key={item._id || item.id} className="flex justify-between py-2 border-b">
            <span>{item.name} x {item.quantity}</span>
            <span>￥{item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-2">
          <span>总价</span>
          <span>￥{totalPrice}</span>
        </div>
      </div>

      {/* 支付方式 */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">支付方式</h2>
        <select
          className="w-full p-2 border rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="模拟支付">模拟支付</option>
        </select>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        提交订单
      </button>
    </div>
  );
}
