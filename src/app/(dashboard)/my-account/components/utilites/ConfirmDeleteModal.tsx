// src/components/utilites/ConfirmModal.tsx
"use client";

import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { closeConfirmModal } from "@/store/uiSlice";
import { X } from "lucide-react";

interface ConfirmModalProps {
  onConfirm: () => void;
  type: "logout" | "removeFavorite";
  itemName?: string;
}

export default function ConfirmModal({ onConfirm, type, itemName }: ConfirmModalProps) {
  const dispatch = useAppDispatch();
  const { confirmModalOpen } = useAppSelector((s) => s.ui);

  if (!confirmModalOpen) return null;

  const title =
    type === "logout"
      ? "از حساب کاربری خارج می‌شوید؟"
      : `آیا مطمئن هستید که می‌خواهید "${itemName}" را حذف کنید؟`;

  const description =
    type === "logout"
      ? "با خروج از حساب کاربری، به سبد خرید فعلی‌تان دسترسی نخواهید داشت."
      : "این عمل قابل بازگشت نیست.";

  const confirmText = type === "logout" ? "خروج از حساب" : "حذف";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <div
        className="pointer-events-auto bg-white dark:bg-zinc-700 rounded-xl w-full max-w-md mx-4 overflow-hidden shadow-xl animate-fadeInUp"
        onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن با کلیک روی خود مودال
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={() => dispatch(closeConfirmModal())}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 text-gray-700 dark:text-gray-200 text-sm">{description}</div>

        {/* Actions */}
        <div className="flex flex-col-reverse lg:flex-row lg:justify-end gap-3 p-4 border-t border-gray-200 dark:border-zinc-600">
          <button
            onClick={() => dispatch(closeConfirmModal())}
            className="w-full lg:w-auto px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-500 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-600 transition"
          >
            انصراف
          </button>
          <button
            onClick={() => {
              onConfirm();
              dispatch(closeConfirmModal());
            }}
            className="w-full lg:w-auto px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
