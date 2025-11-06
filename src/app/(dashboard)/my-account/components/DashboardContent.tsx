// src/app/(dashboard)/my-acount/page.tsx
"use client";

import { useAuth } from "@/lib/useAuth";
import Link from "next/link";
import SidebarDashboard from "./Sidebar";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Profile from "./sections/Profile";
import Orders from "./sections/Orders";
import Favorites from "./sections/Favorites";
import Addresses from "./sections/Addresses";
import Settings from "./sections/Settings";
import HeaderDashboard from "./DashboardHeader";
import { useAppSelector } from "@/store/hooks";

const DEFAULT_TAB = "profile" as const;
type Tab = "profile" | "orders" | "favorites" | "addresses" | "settings";

export default function DashboardContent() {
  const { user } = useAuth()
  const router = useRouter();
  const path = usePathname();
  const search = useSearchParams();
  const { sidebarOpen } = useAppSelector(s => s.ui)

  const q = (search?.get("tab") ?? DEFAULT_TAB) as Tab;
  const [tab, setTab] = useState<Tab>("profile");

  useEffect(() => {
    if(q && q !== tab) setTab(q)
  },[q])

  const changeTab = (next: Tab) => {
    console.log(next);
    setTab(next)
    const url = `${path}?tab=${next}`
    router.push(url, { scroll: false })
    
  }
  return (
    
    <main className="min-h-screen flex flex-row">
      <aside className="">
        {user && <SidebarDashboard active={tab} isOpen={sidebarOpen} onChange={changeTab} user={user} />}
      </aside>

      <div className="px-5 pt-5 space-y-2 sm:space-y-5 md:space-y-10 flex-1 transition-all duration-300 md:mr-70">
        <HeaderDashboard />
        {tab === "profile" && <Profile />}
        {tab === "orders" && <Orders />}
        {tab === "favorites" && <Favorites />}
        {tab === "addresses" && <Addresses />}
        {tab === "settings" && <Settings />}
      </div>
    </main>
  );
}
