import React from "react";

export const metadata = {
  title: "Coffee Shop | ورود / ثبت نام",
  description: "صفحه ورود و ثبت نام فروشگاه قهوه آنلاین",
  icons: {
    icon: [
      { url: "/app-logo.png", type: "image/png", sizes: "32x32" },
      { url: "/app-logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/app-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg" sizes="32x32" href="/app-logo.svg" />
        <link rel="icon" type="image/svg" sizes="16x16" href="/app-logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/app-logo.svg" />
        {/* Theme colors */}
        <meta name="theme-color" content="#ECE0D1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="flex min-h-screen items-center justify-center bg-brown-100 dark:bg-zinc-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
