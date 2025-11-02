"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!email.trim()) newErrors.email = "ایمیل الزامی است";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "ایمیل معتبر نیست";
    if (!password.trim()) newErrors.password = "رمز عبور الزامی است";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("لطفاً فرم را به درستی پر کنید!");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        toast.success(res.data.message || "ورود با موفقیت انجام شد!");
        setEmail("");
        setPassword("");
        router.push("/");
      } else {
        toast.error(res.data.error || "خطایی در هنگام ورود رخ داد");
      }
    } catch (err: any) {
      // اگر سرور پیام خطا ارسال کرد (مثل 404 یا 401)
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("خطایی در برقراری ارتباط با سرور رخ داد!");
      }
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 md:w-[350px] text-zinc-800 dark:text-gray-200 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-2xl shadow-md p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" aria-label="بازگشت به صفحه اصلی">
            <svg className="w-[120px] h-10 text-orange-300 hover:opacity-80 transition">
              <use href="#logo-type"></use>
            </svg>
          </Link>
        </div>

        <h2 className="text-xl xs:text-2xl font-DanaBold mb-6 text-center">
          ورود به حساب
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* ایمیل */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">
              ایمیل <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.email
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
              } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">{errors.email}</span>
            )}
          </div>

          {/* رمز عبور */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">
              رمز عبور <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.password
                  ? "border-red-500"
                  : "border-zinc-300 dark:border-zinc-700"
              } bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-teal-600 dark:bg-emerald-500 hover:bg-teal-700 dark:hover:bg-emerald-600 text-white font-DanaBold px-6 py-3 rounded-xl transition"
          >
            ورود
            <LogIn size={20} />
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-zinc-600 dark:text-zinc-400">
          حساب ندارید؟{" "}
          <Link
            href="/register"
            className="text-teal-600 dark:text-emerald-400 font-DanaBold hover:underline"
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </motion.div>
    </section>
  );
}
