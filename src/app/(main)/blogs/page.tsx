"use client";

import React, { useEffect, useState } from "react";
import { BlogBox, Breadcrumb } from "@/components";
import { BlogBoxProps } from "@/types";
import api from "@/lib/axios";



export default function BlogsPage() {
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
    <main className="container mx-auto py-8 sm:py-28 md:pt-40 px-4">
      {/* --- عنوان صفحه --- */}
      <header className="text-center mb-14">
        <h1 className="font-DanaBold text-4xl md:text-6xl text-zinc-800 dark:text-white mb-3">
          بلاگ قهوه
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          تازه‌ترین مقالات دنیای قهوه، از معرفی دانه‌ها و روش‌های دم‌آوری تا
          نکات باریستایی و هنر لاته آرت.
        </p>
      </header>

      <div className="mt-3 sm:mt-5 md-mt-8 mr-4 md:mr-10">
                <Breadcrumb
              
                    items = {[
                      { label: "خانه", href: "/" },
                      { label: "بلاگ"},
                      
                    ]}
                    />
              </div>

      {/* --- لیست بلاگ‌ها --- */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 md:gap-5">
          {blogs.map(blog => (
            <BlogBox key={blog._id} {...blog} />
          ))}
        </div>
    </main>
  );
}
