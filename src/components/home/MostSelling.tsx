"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductBox } from "../shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";

export default function MostSelling() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<ProductBoxProps[]>([])
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
      
  },[])

   if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;


  

  return (
    <section className="most-selling mb-9 md:mb-20">
      <div className="container mx-auto">
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
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductBox {...product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
