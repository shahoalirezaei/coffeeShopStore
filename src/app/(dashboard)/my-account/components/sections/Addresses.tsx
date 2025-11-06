"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, MoreVertical, PlusCircle } from "lucide-react";
import AddressModal from "../utilites/AddressModal";
import { Address } from "@/types";

export default function Addresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      title: "خانه",
      city: "شهرک پیام، خیابان دادگر",
      postalCode: "۶۶۱۶۹۶۳۸۱۹",
      receiver: "دانیال صادقی",
      phone: "۰۹۳۹۸۶۰۶۳۵۶",
      isDefault: true,
    },
    {
      id: "2",
      title: "محل کار",
      city: "خیابان آزادی، ساختمان سپهر",
      postalCode: "۶۶۱۳۲۲۴۵۶۷",
      receiver: "شاهو علیرضایی",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<Address | undefined>(undefined);

  const handleSave = (data: Address) => {
    if (data.id) {
      // ویرایش آدرس موجود
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === data.id ? data : addr))
      );
    } else {
      // افزودن آدرس جدید
      setAddresses((prev) => [
        ...prev,
        { ...data, id: Date.now().toString() },
      ]);
    }
  };

  const handleAddNew = () => {
    setEditAddress(undefined);
    setModalOpen(true);
  };

  const handleEdit = (addr: Address) => {
    setEditAddress(addr);
    setModalOpen(true);
  };

  return (
    <section className="bg-white dark:bg-zinc-700 dark:text-white shadow-sm rounded-xl overflow-hidden p-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-600 pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          آدرس‌ها
        </h2>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 text-sm text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition"
        >
          <PlusCircle className="w-5 h-5" />
          افزودن آدرس جدید
        </button>
      </div>

      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`flex items-start justify-between px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                addr.isDefault
                  ? "border-teal-600 bg-teal-50 dark:bg-teal-900/30"
                  : "border-gray-200 dark:border-zinc-600"
              }`}
              onClick={() => handleEdit(addr)}
            >
              <div className="flex items-start gap-4">
                <MapPin
                  className={`w-6 h-6 ${
                    addr.isDefault
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-gray-500 dark:text-gray-300"
                  }`}
                />
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-gray-800 dark:text-white">
                    {addr.title || "بدون عنوان"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{addr.city}</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    کد پستی: {addr.postalCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    گیرنده: {addr.receiver} | {addr.phone}
                  </p>
                </div>
              </div>
              <MoreVertical className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition" />
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Image
            src="/images/empty-address.svg"
            alt="empty"
            width={180}
            height={135}
            className="mb-4 opacity-80"
          />
          <p className="text-base font-medium text-gray-700 dark:text-gray-200">
            هنوز هیچ آدرسی ثبت نکرده‌اید
          </p>
          <button
            onClick={handleAddNew}
            className="mt-4 px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition"
          >
            افزودن آدرس جدید
          </button>
        </div>
      )}

      {/* Modal */}
      <AddressModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        address={editAddress}
      />
    </section>
  );
}
