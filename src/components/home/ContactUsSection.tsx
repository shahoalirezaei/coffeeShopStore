"use client";

import React from "react";
import Image from "next/image";

export default function ContactUsSection() {
  return (
    <section className="contact-us mb-9 md:mb-20">
      <div className="container mx-auto">
        <div className="md:flex md:items-center md:justify-between gap-x-4">
          {/* تصویر */}
          <div className="px-7 md:px-1">
            <Image
              src="/images/contact.png"
              alt="Contact us"
              width={200}
              height={206}
              className="w-[200px] h-[206px] sm:w-auto sm:h-auto"
              priority={false}
            />
          </div>

          {/* متن و دکمه */}
          <div>
            <div>
              <h3 className="section-title">یکی از بهترین قهوه ها!</h3>
              <span className="section-subtitle">کیفیت را از ما بخواهید ...</span>
            </div>
            <div>
              <span className="font-DanaBold font-bold text-zinc-600 dark:text-white/90 tracking-widest leading-6">
                ...
              </span>
              <p className="text-zinc-600 dark:text-white/90 text-sm md:text-xl leading-6 text-justify">
                جایی گرم و دنج را تجربه کنید، جایی که همه می توانند قهوه معطری پیدا کنند و دسرهای خوشمزه ما را که کاملا با قهوه داغ همراه شده است را امتحان کنند. فضای شیک، قهوه تازه و گرم و کارکنان خوش برخورد روز شما را خواهند ساخت!
              </p>
              <a
                href="#"
                className="inline-flex items-center mt-5 py-2 px-2.5 text-orange-300 gap-x-2 border border-orange-300 rounded-3xl hover:bg-orange-200 hover:text-orange-400"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5">
                  <use href="#phone" />
                </svg>
                <span className="text-xs tracking-tighter md:text-base">
                  ثبت سفارش تلفنی
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
