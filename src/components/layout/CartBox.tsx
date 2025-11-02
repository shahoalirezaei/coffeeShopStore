"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeCart } from "@/store/uiSlice";



export default function CartBox() {
  const items = useAppSelector((s) => s.cart.items);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.ui.cartOpen);

  const subtotal = items.reduce(
    (sum, it) => sum + (it.price ?? 0) * it.quantity,
    0
  );

  return (
    <>
      {/* --- Overlay (blur background) --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={()=>dispatch(closeCart())}
        ></div>
      )}

      {/* --- Cart Box --- */}
      <div
        className={`z-50 transition-all duration-300 
          fixed top-0 left-0 w-64 h-screen pt-5 px-4 bg-white dark:bg-zinc-700 isolate overflow-y-auto
          md:absolute md:top-full md:-left-20 md:w-[400px] md:h-auto md:max-h-[500px] md:p-5 md:rounded-2xl md:shadow-custom
          ${isOpen
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible md:translate-y-[-12px]"
          }`}
      >
        {/* --- Header (Mobile only) --- */}
        <div className="flex justify-between items-center pb-5 mb-5 border-b border-b-gray-300 dark:border-b-white/10 text-zinc-600 dark:text-white md:hidden">
          <button onClick={() => dispatch(closeCart())} className="cart-close-btn">
            <svg className="w-5 h-5 text-zinc-600 dark:text-white">
              <use href="#x-mark"></use>
            </svg>
          </button>
          <span className="text-base font-DanaBold">سبد خرید</span>
        </div>

        {/* --- Cart content --- */}
        {items.length === 0 ? (
          <div className="text-center py-10 text-zinc-500 dark:text-zinc-400">
            سبد خرید خالی است
          </div>
        ) : (
          <>
            {/* --- Desktop Header --- */}
            <div className="hidden md:flex justify-between text-xs items-center">
              <span className="text-gray-300">{items.length} مورد</span>
              <Link
                href="/cart"
                className="flex items-center text-orange-300 hover:text-orange-400 transition"
                onClick={()=> dispatch(closeCart())}
              >
                مشاهده سبد خرید
                <svg className="w-4 h-4">
                  <use href="#chevron-left" />
                </svg>
              </Link>
            </div>

            {/* --- Items --- */}
            <div className="child:pb-5 child:mb-5 child:border-b border-b-gray-100 dark:border-b-white/10 divide-y divide-gray-100 dark:divide-white/10 mt-2">
              {items.map((it) => (
                <div key={it._id} className="flex gap-x-2">
                  <Image
                    src={it.image}
                    width={90}
                    height={90}
                    alt={it.title}
                    className="w-[90px] h-[90px] object-cover rounded-xl"
                  />
                  <div className="flex flex-col justify-between gap-y-1.5">
                    <h4 className="text-zinc-700 dark:text-white text-sm md:text-base mt-2 md:mt-3  font-DanaBold line-clamp-2">
                      {it.title}
                    </h4>
                    <div>
                      <div className="text-teal-600 dark:text-emerald-500 text-xs font-bold tracking-tighter">
                        {it.discount
                          ? `${it.discount.toLocaleString("fa-IR")} تومان تخفیف`
                          : ""}
                      </div>
                      <div className="text-teal-600 dark:text-emerald-500 text-sm font-DanaBold">
                        {(it.price ?? 0).toLocaleString("fa-IR")}
                        <span className="font-Dana text-xs mr-1">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- Footer --- */}
            <div className="flex items-end gap-x-4 mt-auto mb-8 md:justify-between md:mt-5">
              <Link
                href="/cart"
                onClick={()=> dispatch(closeCart())}
                className="flex justify-center items-center w-28 h-11 bg-teal-600 dark:bg-emerald-500 
                 transition-colors text-white rounded-xl text-base tracking-tighter"
              >
                ثبت سفارش
              </Link>
              <div>
                <span className="text-gray-300 text-xs tracking-tighter">
                  مبلغ قابل پرداخت
                </span>
                <div className="text-zinc-700 dark:text-white font-DanaBold text-base">
                  {subtotal.toLocaleString("fa-IR")}
                  <span className="font-Dana text-xs ml-1">تومان</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
