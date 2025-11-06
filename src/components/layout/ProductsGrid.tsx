"use client";

import React, { useState, useMemo } from "react";
import { ProductBoxProps } from "@/types";
import { ProductBox } from "@/components/shared";
import { motion, Variants } from "framer-motion";

interface ProductsGridProps {
  initialProducts: ProductBoxProps[];
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ initialProducts }) => {
  const [products] = useState<ProductBoxProps[]>(initialProducts);
  const [category, setCategory] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    // if (category !== "all") filtered = filtered.filter((p) => p.category === category);
    if (availableOnly) filtered = filtered.filter((p) => p.available);
    if (sortBy === "price-asc") filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === "price-desc") filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    return filtered;
  }, [products, category, availableOnly, sortBy]);

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } },
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 mx-6">
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
    </>
  );
};

export default ProductsGrid;
