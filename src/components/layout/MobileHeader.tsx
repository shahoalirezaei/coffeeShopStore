"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { CartBoxTrigger } from "../shared";

export default function MobileHeader() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 h-16 md:hidden bg-white dark:bg-zinc-700">
      {/* Nav Icon */}
      <button onClick={() => setSidebarOpen(true)} className="nav-icon">
        <svg className="w-6 h-6 text-zinc-700 dark:text-white">
          <use href="#bars-3"></use>
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Logo */}
      <div>
        <svg className="w-[100px] h-10 text-orange-300">
          <use href="#logo-type"></use>
        </svg>
      </div>

      {/* Shopping Cart */}
       <CartBoxTrigger />
    </div>
  );
}
