// src/components/layout/UserDropdown.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeUserDropdown } from "@/store/uiSlice";
import { PowerOff, UserRound } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { logout } from "@/store/authSlice";
import api from "@/lib/axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function UserDropdown() {
  const dispatch = useAppDispatch();
  const open = useAppSelector((s) => s.ui.userDropdownOpen);
  const { user } = useAuth();

  if (!open) return null;

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("با موفقیت خارج شدید");
      dispatch(logout())
      dispatch(closeUserDropdown());
      
    } catch {
      toast.error("خطا در خروج");
    }
  };

  return (
    <div className="absolute top-full left-0 z-50 mt-4">
      <div className="w-[280px] bg-gray-100 dark:bg-zinc-800 rounded-lg shadow-lg p-4 text-zinc-300">
        {/* User info */}
        <div className="flex items-center gap-3 mb-3 border-b border-b-gray-400 border-gray-100 dark:border-white/5 pb-3">
           <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
            <Image
              src={user?.avatar || "/images/about/profile-team.jpg"}
              alt={user?.name ?? "کاربر مهمان"}
              width={48}  // برابر با w-12
              height={48} // برابر با h-12
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-DanaBold truncate text-zinc-800 dark:text-white">{user?.name ?? "کاربر مهمان"}</div>
            <div className="text-sm text-zinc-400">{user?.email ?? ""}</div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 text-zinc-600 dark:text-gray-200">
          <Link href="/dashboard" onClick={() => dispatch(closeUserDropdown())} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
            <svg className="w-5 h-5"><use href='/dashboard' /></svg>
            پیشخوان
          </Link>

          <Link href="/profile" onClick={() => dispatch(closeUserDropdown())} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
            <UserRound className="w-5 h-5" />
            جزئیات حساب
          </Link>

          <Link href="/orders" onClick={() => dispatch(closeUserDropdown())} className="px-3 py-2 rounded-md hover:bg-orange-300 hover:text-white transition text-sm flex items-center gap-2">
            <svg className="w-5 h-5"><use href="#briefcase" /></svg>
            سفارشات من
          </Link>
        </div>

        <div className="mt-3 pt-3 border-t text-zinc-500 dark:text-gray-200 border-white dark:border-white/5">
          <button onClick={handleLogout} className="w-full text-sm px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition flex items-center justify-center gap-2">
            <PowerOff className="w-5 h-5" />
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}
