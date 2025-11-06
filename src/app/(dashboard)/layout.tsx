// DashboardLayout.tsx
"use client";

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-[#F0F0F0] dark:text-gray-100 dark:bg-dark-mode">
      {children}
    </div>
  );
}

export default DashboardLayout;
