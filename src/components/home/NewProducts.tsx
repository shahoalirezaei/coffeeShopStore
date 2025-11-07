// src/components/home/NewProducts.tsx
import Link from "next/link";
import { ProductBox } from "../shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios"; // instance Axios

export default async function NewProducts() {
  let products: ProductBoxProps[] = [];

  try {
    const res = await api.get<ProductBoxProps[]>("/products");
    products = res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = []; // fallback به آرایه خالی
  }

  return (
    <section className="products dark:bg-[url('/images/products-bg.png')] pt-8 md:pt-24 lg:pt-48">
      <div className="container mx-auto">
        <div className="flex justify-between items-end mb-5 md:mb-12 lg:mb-14">
          <div className="flex flex-col gap-y-1">
            <h2 className="section-title">جدیدترین محصولات</h2>
            <p className="section-subtitle">فراوری شده از دانه قهوه</p>
          </div>
          <Link
            href="/products"
            className="flex items-center text-orange-300 hover:text-orange-400 text-xs md:text-base md:hover:text-xl transition-all duration-300"
          >
            <span className="hidden md:inline-block">مشاهده همه ی محصولات</span>
            <span className="md:hidden">مشاهده همه </span>
            <svg className="w-5 h-5 md:w-[26px] md:h-[26px]">
              <use href="#chevron-left-mini" />
            </svg>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-zinc-600 dark:text-gray-400 py-10">
            هیچ محصولی برای نمایش موجود نیست.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
            {products.slice(-8).map((p) => (
              <ProductBox key={p._id} {...p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
