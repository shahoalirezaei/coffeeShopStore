// src/app/products/page.tsx
import React from "react";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";
import { ProductsGrid } from "@/components";
import { Breadcrumb } from "@/components/shared";

export default async function ProductsPage() {
let products: ProductBoxProps[] = [];

  try {
    const { data } = await api.get<ProductBoxProps[]>("/api/products");
    products = data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = []; // fallback به آرایه خالی
  }

  return (
    <main className="products-page dark:bg-[url('/images/products-bg.png')] pt-8 md:pt-24 lg:pt-48 min-h-screen mb-5 md:mb-8">
      <div className="container mx-auto">
        <div className="mr-4 md:mr-10">
          <Breadcrumb
            items={[
              { label: "خانه", href: "/" },
              { label: "فروشگاه" },
            ]}
          />
        </div>

        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-DanaBold text-zinc-800 dark:text-white">
            همه محصولات
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm md:text-base">
            مجموعه‌ای از بهترین قهوه‌ها برای هر سلیقه
          </p>
        </div>

        {/* Client Component */}
        <ProductsGrid initialProducts={products} />
      </div>
    </main>
  );
}
