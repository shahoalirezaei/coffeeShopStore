"use client";
import React, { useEffect, useState } from "react";
import { ProductBox } from "../shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";
import Link from "next/link";

// ===== Skeleton Component =====
const ProductSkeleton = () => (
  <div className="animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-lg h-[250px] w-full flex flex-col justify-between p-4">
    <div className="bg-gray-300 dark:bg-zinc-700 rounded-md h-32 w-full mb-3"></div>
    <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-1/2"></div>
  </div>
);

const NewProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductBoxProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<ProductBoxProps[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="products dark:bg-[url('/images/products-bg.png')] pt-8 md:pt-24 lg:pt-48">
      <div className="container mx-auto">
        {/* ===== Section Header ===== */}
        <div className="flex justify-between items-end tracking-tight mb-5 md:mb-12 lg:mb-14">
          <div className="flex flex-col gap-y-1">
            <h2 className="section-title">جدیدترین محصولات</h2>
            <p className="section-subtitle">فراوری شده از دانه قهوه</p>
          </div>
          <Link
            href="/products"
            className="flex items-center text-orange-300 hover:text-orange-400 text-xs md:text-base md:hover:text-xl transition-all duration-300"
          >
            <span className="hidden md:flex">مشاهده همه محصولات</span>
            <span className="flex md:hidden">مشاهده همه</span>
            <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
              <use href="#chevron-left-mini" />
            </svg>
          </Link>
        </div>

        {/* ===== Product Grid ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.slice(-8).map((p) => <ProductBox key={p._id} {...p} />)}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
