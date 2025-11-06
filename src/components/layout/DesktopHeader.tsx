// src/components/layout/DesktopHeader.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { UserRound } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import UserDropdown from "./UserDropdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleUserDropdown, closeUserDropdown } from "@/store/uiSlice";
import { CartBoxTrigger } from "../shared";

export default function DesktopHeader() {
  const pathname = usePathname();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { userDropdownOpen } = useAppSelector((s) => s.ui);

  const navItems = [
    { title: "صفحه اصلی", href: "/" },
    {
      title: "فروشگاه",
      href: "/products",
      submenu: [
        { title: "قهوه ویژه", href: "/products/special" },
        { title: "قهوه در سطح جهانی", href: "/products/global" },
        { title: "قهوه درجه یک", href: "/products/premium" },
        { title: "ترکیبات تجاری", href: "/products/commercial" },
        { title: "کپسول قهوه", href: "/products/capsules" },
        { title: "قهوه زینو برزیلی", href: "/products/zino" },
      ],
    },
    // { title: "دیکشنری", href: "#" },
    { title: "بلاگ", href: "/blogs" },
    { title: "درباره ما", href: "/about" },
    { title: "تماس با ما", href: "/contact" },
  ];

  const handleAvatarClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation(); // جلوگیری از پراکندگی کلیک به اوِرلِی
      dispatch(toggleUserDropdown());

    },
    [dispatch]
  );


  const handleNavClick = () => {
    if (userDropdownOpen) dispatch(closeUserDropdown());
  };
  // console.log(user);


  return (
    <header className="fixed z-50 top-9 right-0 left-0 hidden md:flex items-center max-w-[2000px] w-[98%] lg:w-[90%] h-24 px-5 lg:px-10 py-5 mx-auto md:bg-black/50 rounded-3xl backdrop-blur-[6px]">
      <div className="flex justify-between items-center w-full">
        {/* Logo & Menu */}
        <nav className="flex items-center gap-x-5 lg:gap-x-9 h-14">
          <div className="shrink-0">
            <Link href="/" onClick={handleNavClick}>
              <Image
                src="/images/app-logo.png"
                alt="Golden Coffee"
                width={80}
                height={80}
                priority
              />
            </Link>
          </div>

          <ul className="flex md:gap-x-5 lg:gap-x-9 h-full text-base text-gray-300 tracking-tightest child:leading-[56px]">
            {navItems.map((item) => (
              <li key={item.href} className={`relative group ${item.submenu ? "has-submenu" : ""}`}>
                <Link
                  href={item.href}
                  onClick={handleNavClick}
                  className={`transition-colors ${pathname === item.href ? "text-orange-200" : "hover:text-orange-300"}`}
                >
                  {item.title}
                </Link>

                {item.submenu && (
                  <div className="absolute top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible p-6 w-52 space-y-4 bg-white border-t-[3px] dark:bg-zinc-700 text-zinc-700 dark:text-white shadow-custom border-t-orange-300 rounded-2xl text-lg tracking-normal transition-all child:inline-block child:transition-colors child-hover:text-orange-300">
                    {item.submenu.map((sub) => (
                      <Link key={sub.href} href={sub.href} onClick={handleNavClick} className={`${pathname === sub.href ? "text-orange-400" : ""}`}>
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Cart, Theme & User */}
        <div className="flex items-center text-base text-orange-200 gap-x-4 lg:gap-x-5 xl:gap-x-10 relative">
          <div className="flex gap-x-4 lg:gap-x-5 items-center relative">
            <CartBoxTrigger />
            <ThemeToggle />
            {/* <CartBox isOpen={false} onClose={() => {}} />  */}
            {/* CartBox خودش وضعیت داخلی دارد؛ اگر کارت تو state محلی باز می‌شود، می‌تونی آن را جایگزین کنی */}
          </div>

          <span className="block w-px h-14 bg-white/20 rounded-sm"></span>

          {/* User Dropdown / Login */}
          {user ? (
            <div className="relative">
              <button
                onClick={handleAvatarClick}
                aria-expanded={userDropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-3 p-1 rounded-full focus:outline-none"
                title={user.name ?? "حساب کاربری"}
              >
                {/* کوچک: اسم و آواتار یا آیکن */}
                <div className="flex gap-0.5 items-end">
                  <svg className="w-4 h-4 transition-transform "><use href="#chevron-down"></use></svg>
                <div className="flex flex-col items-end leading-tight cursor-pointer">
                  
                  <span className="text-sm font-Dana text-orange-300 focus:text-orange-400 hidden lg:block truncate max-w-[110px]">
                    {user.name}
                  </span>
                </div>
                </div>

                {/* آواتار یا آیکن */}
                {user.avatar ? (
                  <Image
                    src={
                      user.avatar.startsWith("http") || user.avatar.startsWith("/")
                        ? user.avatar
                        : `/images/${user.avatar}`
                    }
                    alt={user.name ?? "User avatar"}
                    width={44}
                    height={44}
                    className="rounded-full object-cover border border-orange-300"
                    unoptimized // جلوگیری از بهینه‌سازی برای آواتارهای محلی
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-orange-300 bg-orange-200/10">
                    <UserRound className="w-5 h-5" />
                  </div>
                )}

              </button>

              {/* دراپ‌داون جداگانه کامپوننتی است و خودش وضعیت open را چک می‌کند */}
              <UserDropdown />
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-x-2.5 tracking-tightest">
              <svg className="w-8 h-8">
                <use href="#arrow-right-end-on-rectangle"></use>
              </svg>
              <span className="hidden xl:inline-block">ورود | ثبت نام</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

