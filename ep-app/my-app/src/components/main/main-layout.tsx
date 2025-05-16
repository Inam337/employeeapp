"use client";

import React from "react";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();

  // Add client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're on the dashboard page
  const isDashboardPage = pathname === "/dashboard";

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    // Skip for dashboard
    if (isDashboardPage) return null;

    const pathSegments = pathname.split("/").filter(Boolean);

    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {pathSegments.map((segment, index) => {
            const segmentPath = `/${pathSegments
              .slice(0, index + 1)
              .join("/")}`;
            const isLast = index === pathSegments.length - 1;

            // Format segment name (capitalize first letter)
            const segmentName =
              segment.charAt(0).toUpperCase() + segment.slice(1);

            return isLast ? (
              <BreadcrumbItem key={segment}>
                <BreadcrumbPage>{segmentName}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <React.Fragment key={segment}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={segmentPath}>{segmentName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  // Header component that uses the sidebar context
  const HeaderContent = () => {
    const { state, isMobile } = useSidebar();

    return (
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center px-4 border-b bg-white shadow-sm">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            {isMobile && (
              <SidebarTrigger
                className={state === "collapsed" ? "mx-auto" : "-ml-1"}
              />
            )}
            <div className="flex items-center gap-2">
              {!isDashboardPage ? (
                generateBreadcrumbs()
              ) : (
                <span className="font-semibold">Dashboard</span>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  };

  // Prepare static texts for sidebar
  const sidebarTranslations = {
    appTitle: "Sindh Ombudsman",
    sidebarNavigation: "Navigation",
    homeLabel: "Home",
    dashboardLabel: "Dashboard",
    productsLabel: "Products",
    usersLabel: "Users",
    systemLabel: "System",
    settingsLabel: "Settings",
    versionLabel: "Version 1.0.0",
    insightsLabel: "Insights",
    complaintsLabel: "Complaints",
    reportsLabel: "Reports",
    dataLabel: "Data",
    notificationsLabel: "Notifications",
    feedbacksLabel: "Feedbacks",
    settingLabel: "Setting",
  };

  return (
    <SidebarProvider
      defaultOpen={true}
      className="w-full min-h-screen h-screen flex"
    >
      <AppSidebar translations={sidebarTranslations} />
      <SidebarInset className="flex flex-col flex-1 w-full h-full min-h-screen">
        <HeaderContent />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;
