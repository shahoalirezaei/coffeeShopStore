"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductBox } from "../shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";

// Skeleton Component
const ProductSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-lg h-[250px] w-full flex flex-col justify-between p-4">
    <div className="bg-gray-300 dark:bg-zinc-700 rounded-md h-32 w-full mb-3"></div>
    <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/2"></div>
  </div>
);

export default function MostSelling() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductBoxProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="most-selling mb-9 md:mb-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end tracking-tight mb-5 md:mb-12 lg:mb-14">
          <div className="flex flex-col gap-y-1">
            <h2 className="section-title">پرفروش‌ترین محصولات</h2>
            <p className="section-subtitle">پیشنهاد قهوه‌خورها</p>
          </div>

          <div className="flex justify-center items-center gap-x-3 md:gap-x-[18px]">
            <div ref={prevRef} className="cursor-pointer swiper-button-prev-custom">
              <svg className="w-5 h-5 md:w-[26px] md:h-[26px] rotate-180">
                <use href="#chevron-left-mini" />
              </svg>
            </div>
            <div ref={nextRef} className="cursor-pointer swiper-button-next-custom">
              <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
                <use href="#chevron-left-mini" />
              </svg>
            </div>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          slidesPerView={1.2}
          spaceBetween={12}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          dir="rtl"
          onInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              const nav = swiper.params.navigation!;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }
          }}
          className="pb-4"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <ProductSkeleton />
              </SwiperSlide>
            ))
            : products.length === 0 ? (
              <SwiperSlide>
                <p className="text-center py-10 text-zinc-600 dark:text-gray-400 w-full">
                  هیچ محصولی برای نمایش وجود ندارد.
                </p>
              </SwiperSlide>
            ) : (
              products.map((product) => (
                <SwiperSlide key={product._id}>
                  <ProductBox {...product} />
                </SwiperSlide>
              ))
            )}

        </Swiper>
      </div>
    </section>
  );
}
