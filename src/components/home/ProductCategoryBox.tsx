"use client";

import Image from "next/image";
import React from "react";

interface ProductCategoryBoxProps {
  imageSrc: string;
  title: string;
  href?: string;
}

export default function ProductCategoryBox({
  imageSrc,
  title,
  href = "#",
}: ProductCategoryBoxProps) {
  return (
    <div className="product-category-box w-25 md:w-50 text-center">
      <a href={href}>
        <div className="relative w-full h-[100px] md:h-[150px] flex justify-center items-center">
          <Image
            src={imageSrc}
            alt={title}
            width={150}
            height={150}
            loading="lazy"
            className="object-contain"
          />
        </div>
        <span className="inline-block text-zinc-700 dark:text-white text-sm md:text-xl mt-1.5 md:mt-2.5">
          {title}
        </span>
      </a>
    </div>
  );
}
