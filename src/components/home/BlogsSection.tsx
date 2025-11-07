// src/components/home/BlogsSection.tsx
import React from "react";
import { BlogBox } from "../shared";
import { BlogBoxProps } from "@/types";

import Link from "next/link";

export default async function BlogsSection() {
 let blogs: BlogBoxProps[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      next: { revalidate: 60 }, // ISR برای کش ۱ دقیقه‌ای
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    blogs = await res.json();
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <section className="blogs mb-9 md:mb-20">
      <div className="container mx-auto">
        {/* Section Head */}
        <div className="flex justify-between items-end tracking-tight mb-5 md:mb-12 lg:mb-14">
          <h3 className="section-title">مطالب خواندنی</h3>
          <Link
            href="/blogs"
            className="flex items-center text-orange-300 text-xs md:text-base hover:text-orange-400 md:hover:text-xl"
          >
            <span className="w-full hidden md:flex">مشاهده همه مطالب</span>
            <span className="w-full flex md:hidden">مشاهده همه</span>
            <svg className="w-5 h-5 md:w-[26px] md:h-26px">
              <use href="#chevron-left-mini" />
            </svg>
          </Link>
        </div>

        {/* Section Body */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {blogs.slice(0, 4).map(blog => (
            <BlogBox key={blog._id} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
