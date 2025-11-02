"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, decrement, removeItem, clearCart } from "@/store/cartSlice";
import { Trash2, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumb } from "@/components";

export default function CartPage() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();

  const subtotal = items.reduce((sum, it) => sum + ((it.price ?? 0) * it.quantity), 0);
  const tax = subtotal * 0.09;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <main className="container mx-auto py-20 md:py-36 text-center">
        <h2 className="font-Lalezar text-2xl md:text-4xl mb-6 text-zinc-700 dark:text-white">
          سبد خرید خالی است
        </h2>
        <Link
          href="/products"
          className="text-teal-600 dark:text-emerald-400 hover:underline"
        >
          مشاهده محصولات
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto min-h-screen py-10 md:py-36 lg:py-40">
      <h1 className="font-DanaBold pr-5 text-3xl md:text-6xl/[64px] mb-8 text-zinc-800 dark:text-white tracking-tight">
        سبد خرید شما
      </h1>

      <div className="mt-3 sm:mt-5 md-mt-8 mr-4 md:mr-10">
                      <Breadcrumb
                    
                          items = {[
                            { label: "خانه", href: "/" },
                            { label: "سبد خرید"},
                            
                          ]}
                          />
                    </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* --- لیست محصولات --- */}
        <div className="md:col-span-2 space-y-4">
          <AnimatePresence>
            {items.map((it) => (
              <motion.div
                key={it._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                {/* تصویر */}
                <Image
                  src={it.image}
                  alt={it.title}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />

                {/* عنوان و قیمت */}
                <div className="flex-1 flex flex-col sm:flex-row md:gap-x-7 gap-x-3.5 min-w-0">
                  <h3 className="font-Dana text-base md:text-lg text-zinc-800 dark:text-white line-clamp-2">
                    {it.title}
                  </h3>
                  <div className="text-sm md:text-base text-center text-zinc-500 dark:text-zinc-400 mt-1">
                    {(it.price ?? 0).toLocaleString("fa-IR")} تومان
                  </div>
                </div>

                {/* کنترل تعداد */}
                <div className="flex items-center gap-2">
                  {/* دسکتاپ */}
                  <div className="hidden sm:flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decrement(it._id))}
                      disabled={it.quantity <= 1}
                      className={`px-3 py-1 border rounded-lg transition ${it.quantity <= 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-teal-600 hover:text-white dark:hover:bg-emerald-500"
                        }`}
                    >
                      <Minus />
                    </button>
                    <div className="w-8 text-center font-DanaBold text-xl">
                      {it.quantity.toLocaleString("fa-IR")}
                    </div>
                    <button
                      onClick={() => dispatch(increment(it._id))}
                      className="px-3 py-1 border rounded-lg hover:bg-teal-600 hover:text-white dark:hover:bg-emerald-500 transition"
                    >
                      <Plus />
                    </button>
                  </div>

                  {/* موبایل */}
                  <div className="flex flex-col sm:hidden items-center gap-1">
                    <button
                      onClick={() => dispatch(increment(it._id))}
                      className="rounded-full border hover:bg-teal-600 hover:text-white transition p-1"
                    >
                      <Plus size={16} />
                    </button>
                    <span className="w-5 text-center font-DanaBold text-sm">
                      {it.quantity.toLocaleString("fa-IR")}
                    </span>
                    <button
                      onClick={() => dispatch(decrement(it._id))}
                      disabled={it.quantity <= 1}
                      className={`rounded-full border transition p-1 ${it.quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-600 hover:text-white"
                        }`}
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>

                {/* حذف */}
                <button
                  onClick={() => dispatch(removeItem(it._id))}
                  className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition"
                  title="حذف محصول"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- بخش پرداخت دسکتاپ --- */}
        <aside className="hidden md:block p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-md space-y-5 h-fit sticky top-32">
          <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide">
            {items.map((it) => (
              <Image
                key={it._id}
                src={it.image}
                alt={it.title}
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            ))}
          </div>

          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            جمع کل سفارش:
          </div>
          <div className="text-3xl font-DanaBold text-zinc-800 dark:text-white mb-1">
            {subtotal.toLocaleString("fa-IR")} <span className="text-lg">تومان</span>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
            مالیات: {tax.toLocaleString("fa-IR")} تومان
          </div>
          <div className="text-xl font-DanaBold text-zinc-800 dark:text-white mb-5">
            جمع کل: {total.toLocaleString("fa-IR")} تومان
          </div>

          <button className="w-full py-3 rounded-xl bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition text-white font-DanaBold">
            نهایی‌سازی سفارش
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="w-full py-2 rounded-xl border dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-sm"
          >
            پاک کردن سبد
          </button>
        </aside>
      </div>

      {/* --- sticky footer موبایل --- */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t dark:border-zinc-700 shadow-md p-3 flex flex-col gap-2 z-29">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">جمع کل:</span>
            <span className="font-DanaBold text-lg text-zinc-800 dark:text-white">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="py-2 px-4 rounded-xl border dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition text-sm text-zinc-700 dark:text-zinc-200"
          >
            پاک کردن سبد
          </button>
        </div>

        <button className="w-full py-3 rounded-xl bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 transition text-white font-DanaBold">
          نهایی‌سازی سفارش
        </button>
      </div>

    </main>
  );
}
