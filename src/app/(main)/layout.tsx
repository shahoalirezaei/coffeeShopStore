import type { Metadata } from "next";
import { IconsSprite } from "@/components/shared";
import { DesktopHeader, MobileHeader, Footer } from "@/components";

export const metadata: Metadata = {
  title: "Coffee Shop | فروشگاه قهوه آنلاین",
  description: "سفارش آنلاین بهترین دانه‌ها و نوشیدنی‌های قهوه با ارسال سریع و تازه.",
  icons: {
    icon: [
      { url: "/app-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/app-logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/app-logo.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IconsSprite />
      <DesktopHeader />
      <MobileHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
