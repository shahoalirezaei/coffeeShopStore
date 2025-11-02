"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import CartBox from "@/components/layout/CartBox";
import { openCart } from "@/store/uiSlice";

export default function CartBoxTrigger() {
  const items = useAppSelector((s) => s.cart.items);
  const itemCount = items.reduce((sum, it) => sum + it.quantity, 0);
  const dispatch = useAppDispatch();

  return (
    <div className="relative">
      {/* آیکن سبد خرید */}
      <button
        onClick={() => dispatch(openCart())}
        className="relative py-3"
        aria-label="سبد خرید"
      >
        <svg className="w-7 h-7 md:w-8 md:h-8 text-zinc-700 dark:text-white md:text-orange-200 md:dark:text-orange-200 hover:text-orange-300 transition">
          <use href="#shopping-cart" />
        </svg>

        {/* نشانگر تعداد آیتم‌ها */}
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-400 text-white text-xs font-DanaBold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 9 ? "9+" : itemCount.toLocaleString("fa-IR")}
          </span>
        )}
      </button>

      {/* جعبه سبد خرید */}
      <CartBox/>
    </div>
  );
}
