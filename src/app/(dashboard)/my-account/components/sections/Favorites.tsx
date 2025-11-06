"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react"; // آیکون حذف
import { useAppDispatch } from "@/store/hooks";
import { openConfirmModal } from "@/store/uiSlice";
import ConfirmModal from "../utilites/ConfirmDeleteModal";

interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

const initialFavorites: FavoriteItem[] = [
  {
    id: "f1",
    title: "قهوه اسپرسو عربیکا ۲۵۰ گرمی",
    price: 250000,
    image: "/images/products/p1.png",
  },
  {
    id: "f2",
    title: "قهوه ترک ویژه ۲۰۰ گرمی",
    price: 200000,
    image: "/images/products/p2.png",
  },
  {
    id: "f3",
    title: "قهوه فرانسه دارک رُست",
    price: 180000,
    image: "/images/products/p3.png",
  },
];

export default function Favorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(initialFavorites);
  const [deletProductTitle, setDeleteProductTitle] = useState<string>('')
  const [currntID, setCurrentID] = useState<string | number>()
  const dispatch = useAppDispatch();

  const handleRemove = (currntID: string | number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== currntID));
  };

  return (
    <>
      <section className="bg-white dark:bg-zinc-700 dark:text-white shadow-sm rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-600 px-5 py-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            علاقه‌مندی‌های شما
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-gray-700 dark:text-gray-200">
              <Image
                src="/images/app-logo.png"
                alt="empty"
                width={180}
                height={135}
                className="mb-4"
              />
              <p className="text-base font-medium">لیست علاقه‌مندی شما خالی است</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favorites.map((item) => (
                <li
                  key={item.id}
                  className="border border-gray-200 dark:border-zinc-600 rounded-xl p-4 hover:shadow-md transition-all duration-300 bg-white dark:bg-zinc-800 flex flex-col items-center relative"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={120}
                    height={120}
                    className="rounded-md object-cover mb-3"
                  />
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {item.price.toLocaleString()} تومان
                  </p>

                  {/* دکمه حذف */}
                  <button
                    onClick={() => {
                      dispatch(openConfirmModal())
                      setDeleteProductTitle(item.title)
                      setCurrentID(item.id)
                    }}
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition"
                    aria-label="حذف از علاقه‌مندی‌ها"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <ConfirmModal
      type="removeFavorite"
      onConfirm={() => {
        if(currntID)handleRemove(currntID)}
      }
      itemName={deletProductTitle}
      />
    </>
  );
}
