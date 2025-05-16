"use client";

import React, { useState, useEffect } from "react";
import MainLayout from "@/components/main/main-layout";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR to avoid hydration issues
  }

  return (
    <MainLayout>
      <div className="space-y-6">{children}</div>
    </MainLayout>
  );
}
