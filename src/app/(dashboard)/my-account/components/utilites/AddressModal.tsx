"use client";

import React, { useState, useEffect } from "react";
import { Address } from "@/types"; // مسیر به types.ts
import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Address) => void;
  address?: Address;
}

export default function AddressModal({ open, onClose, onSave, address }: Props) {
  const [form, setForm] = useState<Address>({
    id: address?.id || "",
    title: address?.title || "",
    city: address?.city || "",
    postalCode: address?.postalCode || "",
    receiver: address?.receiver || "",
    phone: address?.phone || "",
    isDefault: address?.isDefault || false,
  });

  useEffect(() => {
    if (address) setForm(address);
    else
      setForm({
        id: "",
        title: "",
        city: "",
        postalCode: "",
        receiver: "",
        phone: "",
        isDefault: false,
      });
  }, [address]);

  const handleChange = (key: keyof Address, value: string | boolean) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.city || !form.receiver || !form.phone) {
      alert("لطفا فیلدهای ضروری را پر کنید");
      return;
    }
    onSave(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed mt-7 inset-0 z-70 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-y-scroll">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-md p-6 relative ">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {address ? "ویرایش آدرس" : "افزودن آدرس جدید"}
        </h3>

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">عنوان آدرس (اختیاری)</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">شهر / خیابان</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">کد پستی</label>
            <input
              type="text"
              value={form.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">گیرنده</label>
            <input
              type="text"
              value={form.receiver}
              onChange={(e) => handleChange("receiver", e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 dark:text-gray-300">شماره تماس</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) => handleChange("isDefault", e.target.checked)}
              id="defaultAddress"
              className="w-4 h-4 accent-teal-500"
            />
            <label htmlFor="defaultAddress" className="text-sm text-gray-600 dark:text-gray-300">
              آدرس پیش‌فرض
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition"
          >
            ذخیره
          </button>
        </form>
      </div>
    </div>
  );
}
