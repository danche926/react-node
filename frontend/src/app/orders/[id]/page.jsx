"use client";

import { useEffect } from "react";
import { useUserStore, useOrderStore } from "@/store";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Loading from "@/components/common/LoadingSpinner";

export default function OrderDetailPage() {
  const { user } = useUserStore();
  const { currentOrder, fetchOrderById, loading } = useOrderStore();
  console.log(currentOrder);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!user) router.push("/login");
    else fetchOrderById(id);
  }, [user, id, fetchOrderById, router]);

  if (loading || !currentOrder) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">订单详情</h1>

      <div className="mb-4">
        <p><span className="font-semibold">订单号：</span>{currentOrder._id}</p>
        <p><span className="font-semibold">状态：</span>{currentOrder.status}</p>
        <p><span className="font-semibold">支付方式：</span>{currentOrder.paymentMethod}</p>
        <p><span className="font-semibold">总价：</span>￥{currentOrder.totalPrice}</p>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">收货地址</h2>
        <p>{currentOrder.shippingAddress.address}</p>
        <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}</p>
        <p>{currentOrder.shippingAddress.country}</p>
      </div>

      <div>
        <h2 className="font-semibold mb-2">商品清单</h2>
        {currentOrder.items.map((item) => (
          <div key={item._id || item.product} className="flex justify-between py-2 border-b">
            <span>{item.name} x {item.quantity}</span>
            <span>￥{item.price * item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
