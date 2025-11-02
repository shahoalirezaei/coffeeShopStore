"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogBoxProps } from "@/types";



const BlogBox: React.FC<BlogBoxProps> = ({ image, title, date, slug, description }) => {
  return (
    <div className="blog-box group flex sm:flex-col justify-between w-full p-3 gap-x-3 sm:gap-y-4 shadow-custom bg-white dark:bg-zinc-700 rounded-2xl">
      <Link href={`/blogs/${slug}`} className="relative w-32 h-32 sm:w-auto sm:h-auto rounded-2xl rounded-bl-4xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-2xl rounded-bl-4xl"
        />
        <svg className="absolute top-0 left-0 right-0 text-sm group-hover:overflow-y-hidden p-4 sm:p-10 opacity-0 group-hover:opacity-100 text-orange-900 bg-orange-300/70 rounded-2xl rounded-bl-4xl w-full h-full transition-all duration-300">
          <use href="#logo-type" />
        </svg>
      </Link>

      <div className="flex flex-col w-3/5 sm:w-full sm:flex-row gap-x-5 justify-between">
        <div className="flex flex-col gap-y-2">
          <Link href={`/blogs/${slug}`}>
          <p className="font-Dana font-medium text-base text-zinc-700 dark:text-white line-clamp-2">{title}</p>
        </Link>
        {description && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        )}
        </div>
        <div className="flex justify-between items-center">
          <span className="font-DanaBold text-sm sm:text-base sm:w-11 sm:border-r sm:pr-2 sm:border-gray-400/20 text-center text-teal-600 dark:text-emerald-500">{date}</span>
          <Link href={`/blogs/${slug}`} className="flex items-center justify-between px-3 py-1 text-xs sm:hidden bg-orange-200/20 text-orange-300 rounded-lg">
            مطالعه
            <svg className="w-4 h-4">
              <use href="#arrow-long-left" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogBox;
