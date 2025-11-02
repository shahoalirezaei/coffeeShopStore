"use client";

import React, { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { toast } from "react-hot-toast";
import { ProductBoxProps } from "@/types";



const CartButton: React.FC<ProductBoxProps> = ({ _id, title, price, image, images, available }) => {
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);

  const handleAdd = () => {
    if (!available) return;
    const item = {
          _id: _id,
          title: title,
          image: image ?? images?.[0],
          price: price ?? 0,
          quantity: 1
        }
        dispatch(addItem(item));
    toast.success("محصول به سبد خرید اضافه شد");
  };

  return (
    <div className="relative flex flex-col items-center">
      {hover && (
        <span className="absolute -top-6 text-xs bg-zinc-900 text-white px-2 py-1 rounded-md whitespace-nowrap select-none z-50">
          {available ? "افزودن به سبد خرید" : "ناموجود"}
        </span>
      )}
      <button
        onClick={handleAdd}
        disabled={!available}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`p-2 rounded-full transition-colors ${
          available
            ? "bg-gray-100 dark:bg-zinc-600 hover:bg-gray-200 dark:hover:bg-zinc-500"
            : "bg-gray-200 dark:bg-zinc-700 cursor-not-allowed opacity-50"
        }`}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5">
          <use href="#shopping-cart" />
        </svg>
      </button>
    </div>
  );
};

export default CartButton;
