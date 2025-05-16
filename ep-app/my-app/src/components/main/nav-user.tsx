"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  collapsed?: boolean;
  translations?: {
    upgrade?: string;
    account?: string;
    billing?: string;
    notifications?: string;
    logout?: string;
  };
}

export function NavUser({
  user,
  collapsed = false,
  translations = {},
}: NavUserProps) {
  const { isMobile, state } = useSidebar();
  const isCollapsed = collapsed || state === "collapsed";

  // Default fallback translations
  const {
    upgrade = "Upgrade",
    account = "Account",
    billing = "Billing",
    notifications = "Notifications",
    logout = "Log out",
  } = translations;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={isCollapsed ? user.name : undefined}
              size={isCollapsed ? "default" : "lg"}
              className={cn(
                "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full",
                isCollapsed && "justify-center"
              )}
            >
              <Avatar
                className={cn(
                  "flex items-center justify-center rounded-lg",
                  "h-6 w-6",
                  isCollapsed && "mx-auto"
                )}
              >
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="h-6 w-6 rounded"
                />
                <AvatarFallback className="rounded-lg">
                  {isCollapsed ? (
                    <User size={12} />
                  ) : (
                    user.name.charAt(0) +
                    (user.name.split(" ")[1]?.charAt(0) || "")
                  )}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "grid flex-1 text-sm leading-tight text-left",
                  isCollapsed && "hidden"
                )}
              >
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown
                className={cn("size-4 ml-auto", isCollapsed && "hidden")}
              />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0) +
                      (user.name.split(" ")[1]?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>{upgrade}</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  <span>{account}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{billing}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>{notifications}</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>{logout}</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
