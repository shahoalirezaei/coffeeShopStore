import type { Metadata } from "next";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { IconsSprite } from "@/components/shared";
import { Providers, ReduxProvider, UIOverlayClient } from "@/components";


export const metadata: Metadata = {
  title: "Coffee Shop",
  description: "Next.js 15 + Tailwind v4 + TypeScript | فروشگاه قهوه آنلاین",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ECE0D1" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg" sizes="32x32" href="/app-logo.svg" />
        <link rel="icon" type="image/svg" sizes="16x16" href="/app-logo.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/app-logo.svg" />
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
