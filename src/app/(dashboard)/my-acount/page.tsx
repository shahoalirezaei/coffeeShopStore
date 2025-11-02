// src/app/(dashboard)/my-acount/page.tsx
"use client";

import Link from "next/link";

export default function DashboardPlaceholder() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900 text-zinc-800 dark:text-white p-5">
      <h1 className="text-4xl md:text-6xl font-DanaBold mb-4">📌 به زودی!</h1>
      <p className="text-lg md:text-2xl mb-6 text-center">
        این صفحه در حال حاضر آماده نیست. بزودی به داشبورد کامل دسترسی خواهید داشت.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 text-white rounded-xl text-lg transition"
      >
        بازگشت به صفحه اصلی
      </Link>
    </main>
  );
}
