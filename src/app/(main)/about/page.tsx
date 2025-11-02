"use client";

import { Breadcrumb } from "@/components";
import Image from "next/image";
import Link from "next/link";

const teemImage = [
    {id: 1, src: "profile-team"},
    {id: 2, src: "profile-team"},
    {id: 3, src: "profile-team"},
]

export default function AboutPage() {
  return (
    <main className="bg-brown-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[460px] flex items-center justify-center bg-cover bg-center bg-[url('/images/about/video-link-bg.webp')]">
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative text-center z-10">
          <h1 className="text-3xl md:text-5xl font-DanaBold text-white mb-3">
            درباره ما
          </h1>
          <p className="text-zinc-200 text-sm md:text-xl max-w-md mx-auto">
            داستان ما با عشق به دانه‌های قهوه و هنر دم‌آوری آغاز شد...
          </p>
        </div>
      </section>

      <div className="mt-3 sm:mt-5 md-mt-8 mr-4 md:mr-10">
          <Breadcrumb
        
              items = {[
                { label: "خانه", href: "/" },
                { label: "درباره ما"},
                
              ]}
              />
        </div>

      {/* Intro Section */}
      <section className="container mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row items-center gap-10">
        
        <div className="flex-1 space-y-5 text-center md:text-right">
          <h2 className="text-2xl md:text-3xl font-DanaBold text-orange-300">
            قهوه طلایی، سفری از مزرعه تا فنجان ☕
          </h2>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
            ما در Golden Coffee باور داریم که هر فنجان قهوه، داستانی برای گفتن دارد. 
            از انتخاب دقیق دانه‌ها تا فرآیند برشته‌سازی و بسته‌بندی، 
            همه چیز با دقت و عشق انجام می‌شود تا بهترین تجربه را برای شما بسازیم.
          </p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-6 py-3 bg-orange-300 text-zinc-900 rounded-full font-DanaBold hover:bg-orange-400 transition-all"
          >
            ارتباط با ما
          </Link>
        </div>

        <div className="flex-1">
          <Image
            src="/images/about/coffee-been.jpg"
            alt="Golden Coffee Beans"
            width={500}
            height={400}
            className="rounded-3xl shadow-lg"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-orange-100 dark:bg-zinc-800 py-14">
        <div className="container mx-auto px-6 md:px-20 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { num: "10+", label: "سال تجربه" },
            { num: "500+", label: "مشتری وفادار" },
            { num: "30+", label: "انواع قهوه" },
            { num: "15+", label: "کشور تأمین‌کننده" },
          ].map((item) => (
            <div key={item.label}>
              <h3 className="text-3xl font-DanaBold text-orange-300">{item.num}</h3>
              <p className="text-zinc-700 dark:text-zinc-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy / Team Section */}
      <section className="container mx-auto px-6 md:px-16 py-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-DanaBold text-orange-300">
            فلسفه ما
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed">
            در دنیای پرسرعت امروز، ما به دنبال مکثی کوچک هستیم؛ مکثی که با عطر قهوه تازه شروع می‌شود.  
            ما باور داریم که کیفیت، احترام به طبیعت و لبخند مشتری، سه اصل طلایی ما هستند.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {teemImage.map((i) => (
            <div
              key={i.id}
              className="bg-white dark:bg-zinc-800 rounded-3xl shadow-md p-6 flex flex-col items-center text-center"
            >
              <Image
                src={`/images/about/${i.src}.jpg`}
                alt="Team Member"
                width={120}
                height={120}
                className="rounded-full mb-4 object-cover"
              />
              <h3 className="font-DanaBold text-orange-300 mb-2">عضو تیم {i.id}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                متخصص در دم‌آوری و برشته‌سازی قهوه با بیش از ۵ سال تجربه در صنعت.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
