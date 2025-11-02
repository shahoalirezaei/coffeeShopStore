"use client";

import React from "react";

const HomeLanding: React.FC = () => {
  return (
    <section className="home relative h-[200px] xs:h-auto xs:aspect-[2/1] md:aspect-auto bg-home-mobile md:bg-home-desktop bg-no-repeat bg-cover bg-[center_top]">
      <div className="relative mx-auto overflow-y-hidden container h-full md:min-h-screen flex justify-end items-center">
        {/* متن سمت راست */}
        <div className="text-white z-10">
          <h2 className="font-DanaBold text-2xl md:text-6xl/[62px] mb-0.5 md:mb-2">
            قهوه عربیکا تانزانیا
          </h2>
          <span className="font-Dana font-light text-xl md:text-5xl/[64px]">
            یک فنجان بالانس !
          </span>
          <span className="block w-[100px] h-px md:h-0.5 bg-orange-300 my-3 md:my-8" />
          <p className="max-w-[201px] md:max-w-[460px] text-xs md:text-2xl font-Dana">
            قطعا نام عربیکا را شنیده اید، عربیکا یکی از گونه های قهوه است که در نواحی مختلف کمربند قهوه کشت می‌شود.
          </p>
        </div>

        {/* دایره‌ها */}
        <div className="hidden md:flex items-center justify-center absolute inset-0 pointer-events-none">
          <div className="circle--main circle circle--lg">
            <div className="circle circle--md">
              <div className="circle circle--sm" />
            </div>
          </div>
        </div>
      </div>

      {/* منحنی پایین */}
      <svg className="absolute bottom-0 right-0 left-0 mx-auto hidden md:inline-block text-gray-100 dark:text-zinc-800 w-[100px] h-[22px]">
        <use href="#curve" />
      </svg>

      {/* دایره کوچک پایین (فلش) */}
      <div className="absolute bottom-0 right-0 left-0 mx-auto translate-y-1/2 hidden md:flex items-center justify-center w-[30px] h-[30px] border-2 border-orange-300 rounded-full">
        <svg className="w-5 h-5 text-zinc-700 dark:text-white">
          <use href="#chevron-down" />
        </svg>
      </div>
    </section>
  );
};

export default HomeLanding;
