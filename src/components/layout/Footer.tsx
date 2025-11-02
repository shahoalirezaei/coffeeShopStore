"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-zinc-700 pt-6 md:pt-12 text-white/80">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center md:justify-between gap-5">
          {/* Col 1 */}
          <div className="max-w-md">
            <div className="flex gap-x-2 text-white/80 mb-4">
              <svg className="w-10 h-10">
                <use href="#logo"></use>
              </svg>
              <svg className="w-[100px] h-10">
                <use href="#logo-type"></use>
              </svg>
            </div>
            <p className="text-white/80 tracking-tight text-sm text-justify leading-6 md:leading-8">
              ما بر آنیم تا با پیشرو بودن در فرایند تولید، نوع و کیفیت محصول، خدمات و توزیع الگویی مناسب برای تولیدکنندگان ایرانی باشیم و به مرجع فرهنگ قهوه در ایران تبدیل شویم.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-DanaBold text-xl mb-4">دسترسی سریع</h5>
            <div className="flex justify-start items-center mr-4">
              <ul className="ml-14 space-y-1 list-disc child-hover:text-orange-300">
                <li><Link href="#" className="text-sm">حریم خصوصی</Link></li>
                <li><Link href="#" className="text-sm">عودت کالا</Link></li>
                <li><Link href="#" className="text-sm">شرایط استفاده</Link></li>
                <li><Link href="#" className="text-sm">ثبت سفارش</Link></li>
              </ul>
              <ul className="list-disc space-y-1 child-hover:text-orange-300">
                <li><Link href="#" className="text-sm">پرسش‌های متداول</Link></li>
                <li><Link href="#" className="text-sm">فرصت‌های شغلی</Link></li>
                <li><Link href="#" className="text-sm">ضمانت‌نامه‌ها</Link></li>
                <li><Link href="#" className="text-sm">ارتباط با ما</Link></li>
              </ul>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-DanaBold text-xl mb-4">در تماس باشیم</h5>

            <div className="flex gap-x-1.5 mb-3">
              <svg className="w-4 h-4">
                <use href="#location"></use>
              </svg>
              <span className="text-white/80 tracking-tight text-xs">
                خیابان ششم بهمن، خیابان ادب، نبش کوچه هفتم
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2">
              <div className="flex items-center gap-x-1.5 hover:text-orange-300 text-base">
                <svg className="w-4 h-4">
                  <use href="#envelope"></use>
                </svg>
                <Link href="mailto:shahoalirezaei95@gmail.com">shahoalirezaei95@gmail.com</Link>
              </div>
              <div className="flex items-center gap-x-1.5 hover:text-orange-300 text-base">
                <svg className="w-4 h-4">
                  <use href="#phone"></use>
                </svg>
                <Link href="tel:+989190973470">09190973470</Link>
              </div>
            </div>

            <div className="flex gap-x-1 mt-8 max-w-xs text-orange-300">
              <div className="flex gap-x-1 border border-orange-300 rounded-lg py-1 w-1/2 justify-center items-center hover:bg-orange-300 hover:text-zinc-700">
                <svg className="w-5 h-5">
                  <use href="#instagram"></use>
                </svg>
                <span className="text-base">coffee-sa@</span>
              </div>
              <div className="flex gap-x-1 border border-orange-300 rounded-lg py-1 w-1/2 justify-center items-center hover:bg-orange-300 hover:text-zinc-700">
                <svg className="w-5 h-5">
                  <use href="#telegram"></use>
                </svg>
                <span className="text-base">coffee-sa@</span>
              </div>
            </div>
          </div>
        </div>

        <div className="line h-px w-full bg-gray-600 my-5"></div>

        {/* Copyright */}
        <div className="pravicy pb-5 flex flex-col sm:flex-row gap-y-3 justify-between items-center">
          <div className="flex gap-x-2 items-center">
            <div className="footer-circle w-[18px] h-[18px] rounded-full">
              <div className="footer-circle w-3 h-3 rounded-full">
                <div className="footer-circle bg-orange-300 border w-2 h-2"></div>
              </div>
            </div>
            <p className="text-[10px]">
              کلیه حقوق این سایت متعلق به مجموعه کافی CoffeeSA می‌باشد
            </p>
          </div>
          <div className="text-end">
            <p className="text-[10px]">Copyright 2024 CoffeeSA. All rights reserved</p>
          </div>
        </div>
      </div>

      {/* SVG Curve */}
      <svg className="absolute top-0 right-0 rotate-180 left-0 mx-auto hidden md:inline-block text-gray-100 dark:text-zinc-800 w-[100px] h-[22px]">
        <use href="#curve"></use>
      </svg>

      {/* Arrow Circle */}
      <div className="absolute -top-[30px] right-0 left-0 mx-auto translate-y-2/4 hidden md:flex items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
        <svg className="w-5 h-5 text-zinc-700 dark:text-white rotate-180">
          <use href="#chevron-down"></use>
        </svg>
      </div>
    </footer>
  );
}
