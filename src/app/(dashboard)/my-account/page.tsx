// src/app/(dashboard)/my-account/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import DashboardContent from "./components/DashboardContent";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !verifyToken(token)) {
    redirect("/login"); // هدایت مستقیم قبل از رندر
  }

  // کاربر معتبر است → رندر محتوای داشبورد
  return <DashboardContent />;
}
