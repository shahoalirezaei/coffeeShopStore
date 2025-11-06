"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProductBoxProps } from "@/types";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import { Breadcrumb } from "@/components";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<ProductBoxProps>();
  const [activeImage, setActiveImage] = useState<string>("");
  const dispatch = useAppDispatch();

  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  // Fake API
  useEffect(() => {
    console.log(id);

    const fetchProduct = async () => {

      try {

        const res = await api.get<ProductBoxProps>(`/products/${id}`)
        setProduct(res.data);
        setActiveImage(res.data.image)
        // console.log(res.data);

      } catch {
        console.log("مشکلی پیش آمده محصول پیدا نشد");
        

      }
    }
    if (id) fetchProduct()
  }, [id]);

  if (!product) return <p className="text-center h-screen w-full  bg-gray-400 text-black text-2xl flex items-center justify-center">در حال بارگذاری...</p>;

  const handleAddToCart = () => {
    if (!product.available) return;
    const item = {
      _id: product._id,
      title: product.title,
      image: product.image ?? product.images?.[0],
      price: product.price ?? 0,
      quantity: 1,
    };
    dispatch(addItem(item));
    toast.success("محصول به سبد خرید اضافه شد");
  };

  return (
    <section className="dark:bg-zinc-800 bg-gray-50 min-h-screen py-8 md:py-36 lg:py-40">
      <div className="mt-3 sm:mt-5 mb-2 mr-4 md:mr-10">
        <Breadcrumb

          items={[
            { label: "خانه", href: "/" },
            { label: "فروشگاه", href: "/products" },
            { label: product?.title || "در حال بارگذاری " },

          ]}
        />
      </div>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="container items-center mx-auto flex flex-col md:flex-row gap-10 md:items-start px-4 md:px-10 gap-x-50"
      >
        {/* ===== سمت چپ: تصویر اصلی + thumbnails ===== */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0 },
          }}
          className="flex-1 flex flex-col items-center md:max-w-2/5"
        >
          <div className="w-full max-w-md relative mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                {product && (
                  <div className="relative w-full sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-square">
                    <Image
                      src={activeImage || product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 500px"
                      className="rounded-2xl object-contain shadow-xl"
                      priority
                    />
                  </div>
                )}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-orange-400 text-white px-3 py-1 rounded-lg shadow-md text-sm font-DanaBold">
                    {product.discount}% تخفیف
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>


          {/* Thumbnails carousel */}
          <div className="flex gap-4 mt-6 max-w-2/3 overflow-x-scroll overflow-y-clip">
            {product.images?.map((img, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveImage(img)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 w-1/3 md:w-[80px] h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-sm ${activeImage === img
                  ? "border-orange-400"
                  : "border-transparent opacity-70 hover:opacity-100"
                  }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </motion.button>
            ))}
          </div>

        </motion.div>

        {/* ===== سمت راست: اطلاعات محصول ===== */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 30 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col gap-4 text-zinc-700 dark:text-gray-200"
        >
          <h1 className="text-2xl md:text-4xl font-DanaBold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < (product.rating || 0)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                    }`}
                >
                  <use href="#star" />
                </svg>
              ))}
            <span className="text-sm text-gray-500 dark:text-gray-400">({product.rating}.0)</span>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-4">
            {product.price !== null && (
              <span className="text-teal-600 dark:text-emerald-400 font-DanaBold text-xl">
                {product.price.toLocaleString("fa-IR")} تومان
              </span>
            )}
            {product.oldPrice && (
              <span className="line-through text-gray-500 dark:text-gray-400">
                {product.oldPrice.toLocaleString("fa-IR")} تومان
              </span>
            )}
          </div>

          {/* Add to Cart */}
          {product.available ? (
            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mt-6 py-3 px-8 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-DanaBold shadow-md transition-all"
            >
              افزودن به سبد خرید
            </motion.button>
          ) : (
            <span className="mt-6 text-red-500 font-DanaBold">موجود نیست</span>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
