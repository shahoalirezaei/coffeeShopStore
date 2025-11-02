"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link
              href={item.href}
              className="hover:underline hover:text-teal-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-DanaBold text-orange-400 dark:text-orange-300">
              {item.label}
            </span>
          )}
          {index < items.length - 1 && " / "}
        </span>
      ))}
    </nav>
  );
}
