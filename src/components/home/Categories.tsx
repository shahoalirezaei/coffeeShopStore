import React from "react";

export default function Categories() {
  return (
    <section className="category-banner mt-8 mb-10 md:my-20 lg:my-24">
      <div className="container mx-auto">
        {/* Container Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 child:h-[248px] child:rounded-xl">
          {/* Types of Coffee */}
          <a href="#" className="category-right cursor-pointer">
            <div className="flex h-full justify-start items-center mr-11">
              <div className="text-white">
                <h6 className="font-DanaBold text-xl sm:text-3xl mb-4">
                  انواع قهوه
                </h6>
                <p className="text-xs sm:text-base">ترکیبی و تک خاستگاه</p>
              </div>
            </div>
          </a>

          {/* Coffee Powder */}
          <a href="#" className="category-left cursor-pointer">
            <div className="flex h-full justify-start items-center mr-11">
              <div className="text-white">
                <h6 className="font-DanaBold text-xl sm:text-3xl mb-4">
                  پودرهای فوری
                </h6>
                <p className="text-xs sm:text-base">
                  نسکافه، هات چاکلت، ماسالا
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
