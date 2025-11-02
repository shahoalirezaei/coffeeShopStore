"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Breadcrumb, ProductBox } from "@/components/shared";
import { ProductBoxProps } from "@/types";
import api from "@/lib/axios";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<ProductBoxProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    api
      .get<ProductBoxProps[]>("/products")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (availableOnly) filtered = filtered.filter((p) => p.available);
    if (sortBy === "price-asc") filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === "price-desc") filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    return filtered;
  }, [products, availableOnly, sortBy]);

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

  // --- Framer Motion Variants ---
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1], // cubic-bezier easing
      },
    },
  };

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
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-DanaBold text-zinc-800 dark:text-white">
            همه محصولات
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm md:text-base">
            مجموعه‌ای از بهترین قهوه‌ها برای هر سلیقه
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <select
            className="px-4 py-2 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-orange-300 outline-0 rounded-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">همه دسته‌ها</option>
            <option value="coffee">قهوه</option>
            <option value="equipment">تجهیزات</option>
            <option value="accessory">اکسسوری</option>
          </select>

          <label className="flex items-center gap-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 accent-emerald-500"
            />
            <span className="text-zinc-700 dark:text-orange-300 text-sm">
              فقط محصولات موجود
            </span>
          </label>

          <select
            className="px-4 py-2 bg-white dark:bg-zinc-700 text-zinc-700 dark:text-orange-300 shadow-custom rounded-xl"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">مرتب‌سازی پیش‌فرض</option>
            <option value="price-asc">قیمت: از کم به زیاد</option>
            <option value="price-desc">قیمت: از زیاد به کم</option>
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <p className="text-center text-zinc-600 dark:text-gray-400">
            هیچ محصولی مطابق فیلترها یافت نشد.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredProducts.map((p) => (
              <motion.div key={p._id} variants={itemVariants}>
                <ProductBox {...p} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default ProductsPage;
