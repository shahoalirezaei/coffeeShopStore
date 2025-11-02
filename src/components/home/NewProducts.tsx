"use client"
import React, { useEffect, useState } from "react";
import { ProductBox } from "../shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";

 const NewProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductBoxProps[]>([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get<ProductBoxProps[]>("/products")
      .then(res => setProducts(res.data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  },[])

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

  

  return (
    <section className="products dark:bg-[url('/images/products-bg.png')] pt-8 md:pt-24 lg:pt-48">
      <div className="container mx-auto">
        {/* ===== Section Header ===== */}
        <div className="flex justify-between items-end tracking-tight mb-5 md:mb-12 lg:mb-14">
          <div className="flex flex-col gap-y-1">
            <h2 className="section-title">جدیدترین محصولات</h2>
            <p className="section-subtitle">فراوری شده از دانه قهوه</p>
          </div>
          <a
            href="#"
            className="flex items-center text-orange-300 hover:text-orange-400 text-xs md:text-base md:hover:text-xl transition-all duration-300"
          >
            <span className="hidden md:flex">مشاهده همه محصولات</span>
            <span className="flex md:hidden">مشاهده همه</span>
            <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
              <use href="#chevron-left-mini" />
            </svg>
          </a>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {products.slice(-8).map((p) => (
            <ProductBox key={p._id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts
