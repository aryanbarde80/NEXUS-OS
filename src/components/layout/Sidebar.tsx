"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Globe,
  Bot,
  Sparkles,
  Store,
  Network,
  Users,
  Bell,
  BarChart3,
  Coins,
  Trophy,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Pen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Domains", href: "/domains", icon: Globe },
  { name: "AI Studio", href: "/ai", icon: Sparkles },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Autoblogger", href: "/ai", icon: Pen },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Knowledge", href: "/knowledge", icon: Network },
  { name: "Collaboration", href: "/collaboration", icon: Users },
  { name: "Community", href: "/community", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Web3 / DAO", href: "/web3", icon: Coins },
  { name: "Gamification", href: "/gamification", icon: Trophy },
  { name: "Vault", href: "/vault", icon: Shield },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {sidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500">
                <span className="text-sm font-bold text-white">N</span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
                NEXUS OS
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="space-y-1 p-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              const Icon = item.icon;

              const link = (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-to-r from-violet-600/10 to-cyan-500/10 text-violet-600 dark:text-violet-400"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-violet-600 dark:text-violet-400")} />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );

              if (!sidebarOpen) {
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return link;
            })}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  );
}
