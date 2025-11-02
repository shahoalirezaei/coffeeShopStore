import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { IconsSprite } from "@/components/shared";
import { Providers, ReduxProvider, UIOverlayClient } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "فروشگاه قهوه آنلاین | Next.js 15 + Tailwind",
  icons: {
    icon: [
      { url: "/app-logo.svg", type: "image/svg", sizes: "32x32" },
      { url: "/app-logo.svg", type: "image/svg", sizes: "16x16" },
    ],
    apple: [{ url: "/app-logo.svg", sizes: "180x180", type: "image/svg" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* theme-color برای light و dark */}
        <meta name="theme-color" content="#ECE0D1" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="bg-brown-100 text-zinc-800 dark:bg-zinc-900 dark:text-white transition-colors duration-300">
        <Providers>
          <ReduxProvider>
            <UIOverlayClient />
            <IconsSprite />
            {children}
          </ReduxProvider>
        </Providers>
        <Toaster position="top-left" reverseOrder={false} />
      </body>
    </html>
  );
}
