"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return <div className={cn("min-h-screen bg-background")}>{children}</div>;
}
