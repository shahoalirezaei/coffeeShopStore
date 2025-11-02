"use client"
import React, { useEffect, useState } from "react";
import ProductCategoryBox from "./ProductCategoryBox";
import { ProductCategoryBoxProps } from "@/types";
import api from "@/lib/axios";

export default function ProductsCategory() {

  const [categories, setCategories] = useState<ProductCategoryBoxProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<ProductCategoryBoxProps[]>("/categories")
      .then(res => setCategories(res.data))
      .catch(error => console.error("Axios Error:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

  // const categories = [
  //   {
  //     image: "/images/categories/category1.png",
  //     title: "قهوه دمی و اسپرسو",
  //   },
  //   {
  //     image: "/images/categories/category2.png",
  //     title: "لوازم جانبی و تجهیزات",
  //   },
  //   {
  //     image: "/images/categories/category3.png",
  //     title: "اسپرسو ساز",
  //   },
  //   {
  //     image: "/images/categories/category4.png",
  //     title: "پک تستر قهوه",
  //   },
  //   {
  //     image: "/images/categories/category5.png",
  //     title: "قهوه ترک",
  //   },
  // ];

  return (
    <section className="products-category my-10 md:my-20">
      <div className="container mx-auto">
        <div className="flex justify-center items-center flex-wrap gap-y-6 gap-x-7 md:gap-[65px]">
          {categories.map((item) => (
            <ProductCategoryBox
              key={item._id}
              imageSrc={item.imageSrc}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
