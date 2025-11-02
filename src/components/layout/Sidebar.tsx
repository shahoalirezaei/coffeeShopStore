"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/lib/useAuth";
import { logout } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { toast } from "react-hot-toast";
import api from "@/lib/axios";
import { PowerOff, UserRound } from "lucide-react";
import { JalaliDate } from "../shared";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const dispath = useAppDispatch();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      dispath(logout())
      toast.success("با موفقیت خارج شدید");
      onClose();
    } catch {
      toast.error("خطا در خروج از حساب!");
    }
  };

  const shopLinks = [
    { title: "قهوه ویژه", href: "/products/special" },
    { title: "قهوه در سطح جهانی", href: "/products/global" },
    { title: "قهوه درجه یک", href: "/products/premium" },
    { title: "ترکیبات تجاری", href: "/products/commercial" },
    { title: "کپسول قهوه", href: "/products/capsules" },
    { title: "قهوه زینو برزیلی", href: "/products/zino" },
  ];

  const navLinks = [
    { title: "صفحه اصلی", href: "/", icon: "#home" },
    { title: "فروشگاه", href: "/products", icon: "#shopping-bag", submenu: shopLinks },
    // { title: "دیکشنری", href: "/dictionary", icon: "#chat-bubble" },
    { title: "بلاگ", href: "/blogs", icon: "#document-text" },
    { title: "درباره ما", href: "/about", icon: "#briefcase" },
    { title: "تماس با ما", href: "/contact", icon: "#phone-arrow-up-right" },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 pt-3 px-4 min-h-screen max-h-screen overflow-y-auto bg-white dark:bg-zinc-800 z-30 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* -------------------------
            Top area:
            - اگر یوزر لاگین باشد: نمایش بلوک پروفایل + دکمه بستن (بدون لوگو)
            - اگر لاگین نیست: نمایش لوگوها + دکمه بستن
        -------------------------- */}
        <div className="flex justify-between items-center pb-5 mb-5 border-b border-b-gray-100 dark:border-b-white/10">
          {user ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                  <Image
                    src={user.avatar ?? "/images/about/profile-team.jpg"}
                    alt={user.name ?? "آواتار"}
                    width={48}   // برابر با w-12
                    height={48}  // برابر با h-12
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="font-DanaBold truncate text-zinc-700 dark:text-white max-w-[150px]">
                    {user.name ?? "کاربر"}
                  </span>
                  <span className="text-sm text-zinc-400"><JalaliDate /></span>
                </div>
              </div>

              <button onClick={onClose} className="p-1">
                <svg className="w-5 h-5 text-zinc-600 dark:text-white">
                  <use href="#x-mark" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* logos */}
              <div className="flex justify-between gap-x-3.5">
                <svg className="w-[35px] h-10 text-orange-300">
                  <use href="#logo"></use>
                </svg>
                <svg className="w-[90px] h-10 text-orange-300">
                  <use href="#logo-type"></use>
                </svg>
              </div>

              <button onClick={onClose} className="p-1">
                <svg className="w-5 h-5 text-zinc-600 dark:text-white">
                  <use href="#x-mark" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* -------------------------
            اگر یوزر لاگین بود: نمایش لینک‌های داشبورد/پروفایل/سفارشات (بلافاصله زیر هدر)
            سپس منوهای اصلی و در انتها فوتر (بدون اطلاعات کاربر تکراری)
        -------------------------- */}
        {user && (
          <div className="px-0 mb-4">
            <div className="flex flex-col gap-1 text-zinc-600 dark:text-gray-200 mb-3">
              <Link href="/dashboard" onClick={onClose} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
                <svg className="w-5 h-5"><use href="#home" /></svg>
                پیشخوان
              </Link>

              <Link href="/profile" onClick={onClose} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
                <UserRound className="w-5 h-5" />
                جزئیات حساب
              </Link>

              <Link href="/orders" onClick={onClose} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
                <svg className="w-5 h-5"><use href="#briefcase" /></svg>
                سفارشات من
              </Link>
            </div>


          </div>
        )}

        {/* Nav Menu (main links) */}
        <ul className="text-zinc-700 dark:text-white space-y-1 border-t border-t-gray-100 dark:border-t-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <div
                className={`flex justify-between items-center pr-2 pl-2 py-2 rounded-md transition-colors ${pathname === link.href
                    ? "bg-orange-200/20 text-orange-200"
                    : "hover:bg-orange-50 dark:hover:bg-zinc-700"
                  }`}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-x-2 flex-1"
                  onClick={onClose}
                >
                  <svg className="w-5 h-5">
                    <use href={link.icon} />
                  </svg>
                  {link.title}
                </Link>

                {link.submenu && (
                  <button
                    onClick={() => setSubmenuOpen((s) => !s)}
                    className="p-1"
                    aria-expanded={submenuOpen}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${submenuOpen ? "rotate-180" : ""}`}
                    >
                      <use href="#chevron-down" />
                    </svg>
                  </button>
                )}
              </div>

              {link.submenu && submenuOpen && (
                <div className="flex flex-col pr-7 mt-2 mb-3 space-y-2 text-sm">
                  {link.submenu.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={onClose}
                      className={`transition-colors ${pathname === sub.href ? "text-orange-300" : "hover:text-orange-200"}`}
                    >
                      {sub.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="flex flex-col items-start text-orange-300 gap-y-6 px-2.5 py-8 mt-8 border-t border-t-gray-100 dark:border-t-white/10">
          {!user ? (
            <Link href="/login" onClick={onClose} className="inline-flex items-center gap-x-2">
              <svg className="w-5 h-5">
                <use href="#arrow-right-end-on-rectangle" />
              </svg>
              ورود | ثبت نام
            </Link>
          ) : (
            // اگر یوزر لاگین هست، نیازی به نشان دادن لینک ورود/اطلاعات دوباره در فوتر نیست
            <div className="">
              <button onClick={handleLogout} className=" hover:bg-red-500 hover:text-white transition  inline-flex items-center gap-x-2">
                <PowerOff className="w-5 h-5" />
                خروج
              </button>
            </div>
          )}

          <ThemeToggle />

          <Link href="/cart" onClick={onClose} className="inline-flex items-center gap-x-2">
            <svg className="w-5 h-5">
              <use href="#shopping-cart" />
            </svg>
            سبد خرید
          </Link>

        </div>
      </div>
    </>
  );
}
