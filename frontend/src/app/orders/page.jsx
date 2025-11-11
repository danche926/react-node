"use client";

import { useEffect } from "react";
import { useUserStore, useOrderStore } from "@/store";
import { useRouter } from "next/navigation";
import Loading from "@/components/common/LoadingSpinner";
import Link from "next/link";

export default function OrdersPage() {
  const { user } = useUserStore();
  const { orders, fetchUserOrders, loading } = useOrderStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchUserOrders(user._id);
    }
  }, [user, fetchUserOrders, router]);

  if (loading) return <Loading />;

  if (!orders || orders.length === 0) return <p className="text-center mt-10">暂无订单</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">我的订单</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order._id} href={`/orders/${order._id}`}>
            <div className="p-4 border rounded hover:shadow cursor-pointer flex justify-between items-center">
              <div>
                <p className="font-semibold">订单号: {order._id}</p>
                <p className="text-gray-500">总价: ￥{order.totalPrice}</p>
              </div>
              <span className="text-sm text-white px-2 py-1 rounded-md bg-blue-500">
                {order.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
