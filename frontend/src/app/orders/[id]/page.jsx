"use client";

import { useEffect } from "react";
import { useUserStore, useOrderStore } from "@/store";
import { useRouter, useParams } from "next/navigation";
import Loading from "@/components/common/LoadingSpinner";

export default function OrderDetailPage() {
  const { user } = useUserStore();
  const { currentOrder, fetchOrderById, loading } = useOrderStore();
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (id) fetchOrderById(id);
  }, [user, id, fetchOrderById, router]);

  if (loading || !currentOrder) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      {/* 顶部标题区 */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          🧾 订单详情
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          查看订单状态、支付信息及商品明细
        </p>
      </div>

      {/* 订单基础信息 */}
      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h2 className="font-semibold text-gray-700 mb-2">📦 基本信息</h2>
          <p><span className="font-medium text-gray-600">订单号：</span>{currentOrder._id}</p>
          <p><span className="font-medium text-gray-600">状态：</span>
            <span className={
              currentOrder.status === "已支付"
                ? "text-green-600 font-semibold"
                : currentOrder.status === "未支付"
                ? "text-yellow-600 font-semibold"
                : "text-gray-600"
            }>
              {currentOrder.status}
            </span>
          </p>
          <p><span className="font-medium text-gray-600">支付方式：</span>{currentOrder.paymentMethod}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h2 className="font-semibold text-gray-700 mb-2">💰 价格信息</h2>
          <p><span className="font-medium text-gray-600">商品总价：</span>￥{currentOrder.totalPrice}</p>
          <p><span className="font-medium text-gray-600">运费：</span>￥0.00</p>
          <p className="font-bold text-lg mt-2 text-gray-800">
            实付金额：<span className="text-red-500">￥{currentOrder.totalPrice}</span>
          </p>
        </div>
      </section>

      {/* 收货地址 */}
      <section className="bg-gray-50 p-4 rounded-lg border mb-8">
        <h2 className="font-semibold text-gray-700 mb-2">📮 收货地址</h2>
        <div className="text-gray-600 leading-relaxed">
          <p>{currentOrder.shippingAddress.address}</p>
          <p>{currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.postalCode}</p>
          <p>{currentOrder.shippingAddress.country}</p>
        </div>
      </section>

      {/* 商品清单 */}
      <section>
        <h2 className="font-semibold text-gray-700 mb-4">🛍️ 商品清单</h2>
        <div className="border rounded-lg overflow-hidden">
          {currentOrder.items.map((item) => (
            <div
              key={item._id || item.product}
              className="flex justify-between items-center p-4 border-b last:border-b-0 bg-white hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-3">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">数量：{item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-800">
                ￥{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 返回按钮 */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push("/orders")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow"
        >
          返回订单列表
        </button>
      </div>
    </div>
  );
}
