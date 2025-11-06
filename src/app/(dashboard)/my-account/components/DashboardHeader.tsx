"use client";

import { JalaliDate } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import React, { useCallback } from "react";
import { toggleSidebar } from "@/store/uiSlice";
import { useTheme } from "next-themes";
import ToggleThemeDashboard from "./utilites/ToggleTheme";

const HeaderDashboard: React.FC = () => {
 const dispatch = useAppDispatch();
 const { sidebarOpen } = useAppSelector(s => s.ui)
 const theme = useTheme();


  const handleMenuBarClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation(); // جلوگیری از پراکندگی کلیک به اوِرلِی
        dispatch(toggleSidebar());
        console.log(theme);
        
  
      },
      [dispatch]
    );

  return (
    <header className="flex items-center justify-between shrink-0 w-full h-22 px-5 sm:px-7 bg-white dark:bg-zinc-700 max-lg:border-b max-lg:border-b-gray-200 lg:rounded-lg ">
      {/* دکمه منو (برای موبایل) */}
      <button 
      className="md:!hidden"
      onClick={handleMenuBarClick}
      >
        <svg className="w-8 h-8"><use href="#bars-3"></use></svg>
      </button>

      {/* نوار جستجو */}
      <div className="bg-[#F0F0F0] dark:bg-zinc-600 relative  hidden md:flex items-center justify-between gap-x-4 w-72 xl:w-85  rounded-lg py-1 px-4 h-12 ">
        <input type="text"
        className="w-full h-full bg-transparent outline-none placeholder:text-gray-400"
        placeholder="سفارش ها، حساب کاربری و ..." 
        />
        <span className="absolute left-4 top-2.5 text-gray-500 dark:text-gray-100 w-5 h-5">
          <Search />
        </span>
      </div>

      {/*  ایکون ها و زمان */}
      <div className="flex justify-end items-center gap-x-4">

      <div className="flex gap-x-2 sm:pl-4">
        <ToggleThemeDashboard />
        <Link
        href="/cart"
        >
          <svg  className="w-8 h-8"><use href="#shopping-cart"></use></svg>
        </Link>
        <span className="w-8 h-8">

        <Bell strokeWidth={1.5} className="w-8 h-8" />
        </span>
      </div>
      <span className="text-sm hidden lg:block text-zinc-400 border-r pr-4 border-r-gray-400"><JalaliDate /></span>
      </div>


    </header>
  );
};

export default HeaderDashboard;
