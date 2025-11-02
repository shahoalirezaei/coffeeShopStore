"use client";

import React from "react";
import Image from "next/image";

export default function CoffeeClub() {
  return (
    <section className="coffee-club mb-9 md:mb-20">
      <div className="container mx-auto">
        <div className="flex justify-between flex-col md:flex-row bg-gradient-to-r from-emerald-500 to-emerald-600 text-white h-52 md:h-36 gap-y-5 p-3 md:px-11 mb-8 md:mb-20 rounded-2xl">
          {/* Up || Right Div */}
          <div className="flex items-center gap-x-2 md:gap-x-6">
            <Image
              src="/images/club/diamond.png"
              alt="coffee club"
              width={110}
              height={110}
              className="w-[87px] lg:w-[110px] md:hidden lg:block"
              priority={false}
            />
            <div>
              <h4 className="font-DanaBold text-2xl lg:text-5xl mb-2">کافی کلاب</h4>
              <p className="font-IRANSans text-base lg:text-xl tracking-tight lg:tracking-normal">
                میدونستی میتونی با امتیازهات قهوه بگیری؟
              </p>
            </div>
          </div>

          {/* Down || Left Div */}
          <div className="flex justify-between items-center md:w-1/2 md:gap-x-2">
            <div className="flex gap-x-2 lg:gap-x-5">
              {/* چرخ و بخت */}
              <div className="w-[72px] h-[72px] lg:w-[98px] lg:h-[98px] text-center text-emerald-600 bg-white py-1.5 lg:pt-5 lg:pb-1 rounded-2xl">
                <svg className="w-10 h-10 lg:w-12 lg:h-12 mb-1 lg:mb-1.5 mx-auto">
                  <use href="#discovery" />
                </svg>
                <span className="text-xs lg:text-sm">چرخ و بخت</span>
              </div>

              {/* ماموریت‌ها */}
              <div className="w-[72px] h-[72px] lg:w-[98px] lg:h-[98px] text-center text-emerald-600 bg-white py-1.5 lg:pt-5 lg:pb-1 rounded-2xl">
                <svg className="w-10 h-10 lg:w-12 lg:h-12 mb-1 lg:mb-1.5 mx-auto">
                  <use href="#activity" />
                </svg>
                <span className="text-xs lg:text-sm">ماموریت ها</span>
              </div>

              {/* جایزه‌ها */}
              <div className="w-[72px] h-[72px] lg:w-[98px] lg:h-[98px] text-center text-emerald-600 bg-white py-1.5 lg:pt-5 lg:pb-1 rounded-2xl">
                <svg className="w-10 h-10 lg:w-12 lg:h-12 mb-1 lg:mb-1.5 mx-auto">
                  <use href="#ticket-star" />
                </svg>
                <span className="text-xs lg:text-sm">جایزه ها</span>
              </div>
            </div>

            {/* امتیاز و دکمه */}
            <div className="flex flex-col h-[72px] lg:h-[98px]">
              <span className="font-DanaBold text-xl lg:text-4xl">542</span>
              <p className="text-sm lg:text-base -mt-1">امتیاز شما</p>
              <a
                href="#"
                className="text-xs lg:text-sm flex justify-between items-center py-0.5 px-1 bg-orange-300 rounded-2xl mt-auto"
              >
                <span className="hidden xs:inline-block">دریافت جایزه</span>
                <span className="inline-block xs:hidden"> جایزه</span>
                <svg className="w-3 h-3 text-white">
                  <use href="#chevron-left-mini" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
