"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogBoxProps } from "@/types";
import Breadcrumb from "./Breadcrumb";

interface BlogDetailPageProps {
  slug: string ;
}

export default function BlogDetailPageClient({ slug }: BlogDetailPageProps) {
  
  const [blog, setBlog] = useState<BlogBoxProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => setBlog(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center h-screen w-full  bg-gray-400 text-black text-2xl flex items-center justify-center">در حال بارگذاری...</p>;;
  if (!blog) return <p className="text-center h-screen w-full  bg-gray-400 text-black text-2xl flex items-center justify-center">این بلاگ یافت نشد</p>;

  return (
    <main className="container mx-auto py-28 md:py-40 px-5 md:px-10">
      {/* Breadcrumb */}
      {/* <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
        <Link href="/" className="hover:underline">خانه</Link> /{" "}
        <Link href="/blogs" className="hover:underline">بلاگ‌ها</Link> / {blog.title}
      </div> */}

      <Breadcrumb 
      items = {[
        { label: "خانه", href: "/" },
        { label: "بلاگ ها", href: "/blogs" },
        { label: blog?.title || "در حال بارگذاری" },
      ]}
      />

      {/* Title */}
      <h1 className="font-DanaBold text-3xl md:text-5xl text-zinc-800 dark:text-white mb-6">{blog.title}</h1>

      {/* Author */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-4 text-zinc-600 dark:text-zinc-300 mb-6">
        <span>نویسنده: <span className="font-DanaBold text-teal-600 dark:text-emerald-500">{blog.author}</span></span>
        <span>تاریخ: <span className="font-DanaBold text-teal-600 dark:text-emerald-500">{blog.date}</span></span>
      </div>

      {/* Image */}
      <div className="mb-8 w-full max-h-[500px] overflow-hidden rounded-2xl shadow-md">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <div className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
        {blog.description && blog.description.split("\n").map((line, i) =>
          line.trim() ? <p key={i}>{line}</p> : null
        )}
      </div>

      {/* Back Link */}
      <div className="mt-10">
        <Link href="/blogs" className="text-orange-300 hover:text-orange-400 font-DanaBold">بازگشت به بلاگ‌ها</Link>
      </div>
    </main>
  );
}
