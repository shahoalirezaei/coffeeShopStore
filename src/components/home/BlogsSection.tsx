"use client";

import React, { useEffect, useState } from "react";
import { BlogBox } from "../shared";
import { BlogBoxProps } from "@/types";
import api from "@/lib/axios";
import Link from "next/link";

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogBoxProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<BlogBoxProps[]>("/blogs")
      .then(res => setBlogs(res.data))
      .catch(error => console.error("Axios Error:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center py-10">در حال بارگذاری...</p>;

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
