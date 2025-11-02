import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Shop | ورود / ثبت نام",
  description: "صفحه ورود و ثبت نام فروشگاه قهوه آنلاین",
  icons: {
    icon: [
      { url: "/app-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/app-logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/app-logo.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brown-100 dark:bg-zinc-900 transition-colors duration-300">
      {children}
    </main>
  );
}
