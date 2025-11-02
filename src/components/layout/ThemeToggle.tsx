"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // جلوگیری از mismatch بین SSR و CSR
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="inline-flex items-center gap-x-2">


            {/* Theme Switch Btn */}
            <div
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}

                className="toggle-theme cursor-pointer">
                <svg className=" w-5 h-5 md:w-8 md:h-8 dark:hidden">
                    <use href="#moon"></use>
                </svg>
                <svg className="w-5 h-5 md:w-8 md:h-8 hidden dark:inline-block">
                    <use href="#sun"></use>
                </svg>
            </div>
            {
                theme === "light" ? (
                    <span className="md:hidden">تم تاریک</span>
                ) : (
                    <span className="md:hidden">تم روشن</span>
                )
            }
        </div>
    );
}



