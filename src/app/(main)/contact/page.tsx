"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Breadcrumb } from "@/components";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "نام الزامی است";
    if (!email.trim()) newErrors.email = "ایمیل الزامی است";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "ایمیل معتبر نیست";
    if (!subject.trim()) newErrors.subject = "موضوع الزامی است";
    if (!message.trim()) newErrors.message = "پیام الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("لطفاً فرم را به درستی پر کنید!");
      return;
    }
    // API call placeholder
    toast.success("پیام شما با موفقیت ارسال شد!");
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setErrors({});
  };

  return (
    <section className="min-h-screen py-20 md:py-36 lg:py-40 px-4 md:px-20 bg-gray-50 dark:bg-zinc-900 text-zinc-800 dark:text-gray-200">
        <div className="mt-3 sm:mt-5 md-mt-8 mr-4 md:mr-10">
          <Breadcrumb

            items={[
              { label: "خانه", href: "/" },
              { label: "تماس با ما" },

            ]}
          />
        </div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
        {/* فرم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-md"
        >
          <h2 className="text-3xl md:text-4xl font-DanaBold mb-6">
            تماس با ما
          </h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            اگر سوال، پیشنهاد یا انتقادی دارید، از طریق فرم زیر با ما در ارتباط باشید.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/** نام */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                نام <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="نام شما"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.name
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
                  } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name}</span>
              )}
            </div>

            {/** ایمیل */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                ایمیل <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="ایمیل شما"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
                  } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">{errors.email}</span>
              )}
            </div>

            {/** موضوع */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                موضوع <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="موضوع"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${errors.subject
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
                  } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
              />
              {errors.subject && (
                <span className="text-red-500 text-xs mt-1">{errors.subject}</span>
              )}
            </div>

            {/** پیام */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">
                پیام <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="پیام شما"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 rounded-xl border ${errors.message
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
                  } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition resize-none`}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-xs mt-1">{errors.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 text-white font-DanaBold px-6 py-3 rounded-xl transition"
            >
              ارسال پیام
              <Send size={20} />
            </button>
          </form>
        </motion.div>

        {/* اطلاعات تماس */}
        <div className="flex flex-1 flex-col gap-3.5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col gap-6 justify-center items-center"
          >
            <h3 className="text-2xl font-DanaBold mb-4">راه‌های ارتباطی</h3>
            <div className="flex items-center gap-3 text-zinc-700 dark:text-gray-300">
              <svg className="w-6 h-6 text-teal-600 dark:text-emerald-400">
                <use href="#phone" />
              </svg>
              <span>09190973470</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-700 dark:text-gray-300">
              <svg className="w-6 h-6 text-teal-600 dark:text-emerald-400">
                <use href="#mail" />
              </svg>
              <span>shahoalirezae@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-700 dark:text-gray-300">
              <svg className="w-6 h-6 text-teal-600 dark:text-emerald-400">
                <use href="#map-pin" />
              </svg>
              <span>تهران، خیابان ششم بهمن، خیابان ادب، نبش کوچه هفتم</span>
            </div>
          </motion.div>

          {/* نقشه گوگل */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="overflow-hidden rounded-2xl shadow-md"
          >
            <iframe
              title="Coffee Shop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d340.55485742623347!2d51.414246454535316!3d35.70353514196152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e017389baf493%3A0xbfa7eb48bcc7287d!2sTehran%20Province%2C%20Tehran%2C%20District%206%2C%20Arjantin%2C%20Iran!5e0!3m2!1sen!2s!4v1761561432069!5m2!1sen!2s"
              width="100%"
              height="350"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl border-0 w-full"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
