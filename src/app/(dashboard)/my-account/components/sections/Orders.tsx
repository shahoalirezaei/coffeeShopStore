"use client";

import React, { useState } from "react";
import Image from "next/image";

type OrderStatus = "pending" | "delivered" | "returned" | "canceled";

interface Order {
  _id: string;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  items: {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

// داده تستی
const mockOrders: Order[] = [
  {
    _id: "o1",
    date: "2025-10-20T10:00:00Z",
    status: "pending",
    totalAmount: 450000,
    items: [
      {
        productId: "p1",
        title: "قهوه اسپرسو عربیکا ۲۵۰ گرمی",
        quantity: 1,
        price: 250000,
        image: "/images/products/p1.png",
      },
      {
        productId: "p2",
        title: "قهوه ترک ویژه ۲۰۰ گرمی",
        quantity: 1,
        price: 200000,
        image: "/images/products/p2.png",
      },
    ],
  },
  {
    _id: "o2",
    date: "2025-09-15T09:00:00Z",
    status: "delivered",
    totalAmount: 180000,
    items: [
      {
        productId: "p3",
        title: "قهوه فرانسه دارک رُست",
        quantity: 1,
        price: 180000,
        image: "/images/products/p3.png",
      },
    ],
  },
];

const tabs = [
  { key: "pending", label: "جاری" },
  { key: "delivered", label: "تحویل شده" },
  { key: "returned", label: "مرجوع شده" },
  { key: "canceled", label: "لغو شده" },
] as const;

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("pending");
  const filteredOrders = mockOrders.filter((o) => o.status === activeTab);

  return (
    <section className="bg-white dark:bg-zinc-700 dark:text-white shadow-sm rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center border-b border-gray-100 dark:border-zinc-600 px-5 py-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">تاریخچه سفارشات</h2>

        <div className="w-full lg:w-auto mt-3 lg:mt-0">
          <input
            type="text"
            placeholder="جستجو در سفارش‌ها"
            className="w-full lg:w-64 px-3 py-2 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm bg-gray-50 dark:bg-zinc-600 text-gray-700 dark:text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <ul className="flex border-b border-gray-200 dark:border-zinc-600 overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <li
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 cursor-pointer text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "text-teal-600 dark:text-teal-400 border-b-2 border-teal-500"
                : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </li>
        ))}
      </ul>

      {/* Orders Content */}
      <div className="p-6">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-700 dark:text-gray-200">
            <Image
              src="/images/app-logo.png"
              alt="empty"
              width={180}
              height={135}
              className="mb-4"
            />
            <p className="text-base font-medium">هنوز هیچ سفارشی ندادید</p>
          </div>
        ) : (
          <ul className="space-y-5">
            {filteredOrders.map((order) => (
              <li
                key={order._id}
                className="border border-gray-200 dark:border-zinc-600 rounded-xl p-4 hover:shadow-md transition-all duration-300 bg-white dark:bg-zinc-800"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    تاریخ:{" "}
                    {new Date(order.date).toLocaleDateString("fa-IR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-2 sm:mt-0">
                    مبلغ کل: {order.totalAmount.toLocaleString()} تومان
                  </span>
                </div>

                {/* Order Items */}
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center border border-gray-100 dark:border-zinc-700 rounded-lg p-2 w-full sm:w-auto bg-gray-50 dark:bg-zinc-700"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <div className="mr-3">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {item.quantity} × {item.price.toLocaleString()} تومان
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
