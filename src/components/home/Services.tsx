"use client";
import React from "react";

interface ServiceItem {
  icon: string;
  title: string;
  subtitle: string;
}

const services: ServiceItem[] = [
  {
    icon: "#support",
    title: "پشتیبانی شبانه‌روزی",
    subtitle: "هفت روز هفته، ۲۴ ساعته",
  },
  {
    icon: "#express-delivery",
    title: "تحویل اکسپرس",
    subtitle: "ارسال بسته با سرعت باد",
  },
  {
    icon: "#coffee",
    title: "رست تخصصی",
    subtitle: "تازه برشته‌شده و با کیفیت",
  },
  {
    icon: "#pitcher",
    title: "اکسسوری قهوه",
    subtitle: "وسایل دم‌آوری",
  },
];

export default function Services() {
  return (
    <section className="services mb-9 md:mb-20">
      <div className="container mx-auto">
        <div
          className="services-Wrapper relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-5"
        >
          {services.map((item, index) => (
            <div
              key={index}
              className="servise-box flex flex-col md:flex-row justify-center md:justify-start items-center gap-x-2"
            >
              <svg className="w-[41px] h-[45px] lg:w-[64px] lg:h-[69px] text-servise-svg-dark dark:text-servise-svg-light">
                <use href={item.icon}></use>
              </svg>
              <div className="text-center md:text-start">
                <p className="text-xs sm:text-sm lg:text-lg text-zinc-800 dark:text-white/90 mb-2">
                  {item.title}
                </p>
                <p className="text-[10px] sm:text-[13px] lg:text-base text-zinc-500 dark:text-white/80">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
