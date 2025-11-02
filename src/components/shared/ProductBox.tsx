"use client";

import React from "react";
import Link from "next/link";
import { ProductBoxProps } from "@/types";
import CartButton from "./CartButton";
import CompareButton from "./CompareButton";

const ProductBox: React.FC<ProductBoxProps> = ({
  _id,
  title,
  price,
  oldPrice,
  image,
  images,
  rating = 0,
  available,
  discount,
}) => {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 md:w-6 md:h-6 ${i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-400"
          }`}
      >
        <use href="#star" />
      </svg>
    ));

  return (
    <div
      // href={`/products/${_id}`}
      className="relative product-box bg-white dark:bg-zinc-700 text-zinc-700 dark:text-gray-300 shadow-custom rounded-2xl flex flex-col h-[380px] md:h-[420px] p-3 md:p-5 hover:scale-[1.02] transition-transform duration-300"
    >
      
      
        {/* عکس محصول */}
        <Link
        href={`/products/${_id}`}
         className="flex justify-center h-[55%] md:h-[60%]">
          <img src={image} alt={title} className="w-auto h-full object-contain" />
        </Link>

        {/* اطلاعات محصول */}
        <div className="flex flex-col flex-1 mt-2">
          <h5 className="text-zinc-700 dark:text-white/90 text-sm sm:text-base sm:font-black font-DanaBold line-clamp-2">
            {title}
          </h5>

          <div className="flex items-baseline mt-1.5 md:mt-2.5 gap-x-2 md:gap-x-2.5">
            {!available ? (
              <span className="font-DanaBold text-xs md:text-base text-red-500">
                فعلاً موجود نیست
              </span>
            ) : (
              <>
                <div className="font-DanaBold text-sm sm:text-base text-teal-600 dark:text-emerald-500">
                  {price?.toLocaleString("fa-IR")}
                  <span className="font-Dana text-xs sm:text-sm ml-1">تومان</span>
                </div>
                {discount !== 0 && oldPrice && (
                  <span className="text-gray-600 text-xs sm:font-bold tracking-normal line-through">
                    {oldPrice.toLocaleString("fa-IR")} تومان
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between w-full mt-auto">
        <div className="flex items-center md:gap-x-3">
          <CartButton _id={_id} title={title} price={price ?? 0} image={image} images={images} available={!!available} />
          <CompareButton />
        </div>

        <div className="flex text-yellow-400">{stars}</div>
      </div>

      {/* تخفیف */}
      {discount && (
        <div className="absolute flex items-center top-2 right-3 px-3 rotate-12 pt-1 text-white bg-orange-400 rounded-xl">
          {discount}%
        </div>
      )}
    </div>
  );
};

export default ProductBox;
