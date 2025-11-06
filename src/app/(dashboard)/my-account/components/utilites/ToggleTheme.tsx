"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleThemeDashboard() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // جلوگیری از mismatch بین SSR و CSR
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        
            <div
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}

                className="toggle-theme cursor-pointer">
                <svg className="w-8 h-8 dark:hidden">
                    <use href="#moon"></use>
                </svg>
                <svg className="w-8 h-8 hidden dark:inline-block">
                    <use href="#sun"></use>
                </svg>
            </div>
            
    );
}



