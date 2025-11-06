"use client"
import React, { ReactElement, useState } from 'react'
import { User } from '@/types'
import Image from 'next/image';
import { CalendarHeart } from 'lucide-react';
import { closeSidebar, openConfirmModal } from '@/store/uiSlice';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { logout } from '@/store/authSlice';
import Link from 'next/link';
import ConfirmModal from './utilites/ConfirmDeleteModal';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

interface SidebarItem {
    key: Tab,
    label: string,
    icon: ReactElement,
}

type Tab = "profile" | "orders" | "favorites" | "addresses" | "settings";
type props = { active: Tab, onChange: (t: Tab) => void, user: User, isOpen: boolean }

const items: SidebarItem[] = [
    { icon: <svg className='w-5 h-5'><use href='#home'></use></svg>, key: "profile", label: "پروفایل" },
    { icon: <svg className='w-5 h-5'><use href='#shopping-bag'></use></svg>, key: "orders", label: "سفارش‌ها" },
    { icon: <CalendarHeart className='w-5 h-5' />, key: "favorites", label: "علاقه‌مندی‌ها" },
    { icon: <svg className='w-5 h-5'><use href='#location'></use></svg>, key: "addresses", label: "آدرس‌ها" },
    { icon: <svg className='w-5 h-5'><use href='#setting' className='w-2 h-2'></use></svg>, key: "settings", label: "تنظیمات" },
]


function SidebarDashboard({ active, onChange, user, isOpen }: props) {
    const dispatch = useAppDispatch();
    const router = useRouter();
    

    const handleClickItem = (itemKey: Tab) => {
        onChange(itemKey);
        dispatch(closeSidebar())
    }

    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            toast.success("با موفقیت خارج شدید");
            dispatch(logout())
            router.push('/')

        } catch {
            toast.error("خطا در خروج")
        }
    }

    return (
        <>
            <div className={` z-50 md:z-40 fixed bg-white dark:bg-zinc-700 w-65 sm:w-70  pt-6 text-xl h-[100vh] transition-all duration-300 overflow-y-auto scrollbar-custom right-0 md:!right-0
        ${isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"

                }`}>
                <div className='header flex justify-between items-center w-full gapx-3 px-5 pb-5 border-b border-b-gray-200'>
                    <div className='w-14 h-14 rounded-full overflow-hidden  dark:bg-zinc-700 flex-shrink-0'>
                        <Image
                            src={user?.avatar || "/images/about/profile-team.jpg"}
                            alt={user?.name ?? "کاربر مهمان"}
                            width={56}
                            height={56}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='user-info'>
                        <h4 className='text-sm sm:text-base font-DanaBold -mb-1.5'>{user.name}</h4>
                        <span className='text-zinc-400 text-[10px] sm:text-xs'>{user.email}</span>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-y-2.5 child:text-gray-600 child-hover:text-zinc-800'>
                        <button
                            onClick={() => dispatch(openConfirmModal())}
                        >
                            <svg className='w-6 h-6'><use href='#arrow-right-end-on-rectangle'></use></svg>
                        </button>
                        <Link
                            href="/my-account?tab=profile"
                        >
                            <button>
                                <svg className='w-6 h-6'><use href='#setting'></use></svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <nav className='space-y-2 pr-1 mt-5'>
                    {items.map(item => (
                        <button
                            key={item.key}
                            onClick={() => handleClickItem(item.key)}
                            className={`w-full py-2.5 px-5 gap-x-3 flex justify-start items-center text-base transition-all duration-300 ${active === item.key ? "bg-orange-300 text-white" : ""
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
            <ConfirmModal
                type="logout"
                onConfirm={() => handleLogout()}
            />
        </>
    )
}

export default SidebarDashboard