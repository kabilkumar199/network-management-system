"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Network,
  Server,
  Settings,
  Activity,
  Shield,
  Database,
  FileText,
  Wrench,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Overview",
    items: [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    name: "Infrastructure",
    items: [
      { name: "Inventory", href: "/inventory", icon: Server },
      { name: "Topology", href: "/topology", icon: Network },
    ],
  },
  {
    name: "Monitoring",
    items: [
      { name: "Performance", href: "/performance", icon: Activity },
      { name: "Faults", href: "/faults", icon: Shield },
      { name: "Security", href: "/security", icon: Shield },
    ],
  },
  {
    name: "Management",
    items: [
      { name: "Configuration", href: "/config", icon: Settings },
      { name: "Backups", href: "/backups", icon: Database },
      { name: "Provisioning", href: "/provisioning", icon: Wrench },
      { name: "Firmware", href: "/firmware", icon: HardDrive },
    ],
  },
  {
    name: "Reports",
    items: [{ name: "Accounting", href: "/accounting", icon: FileText }],
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border h-dvh md:sticky md:top-0",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Network className="h-6 w-6 text-sidebar-primary" />
            <span className="font-semibold text-sidebar-foreground">NMS</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          {navigation.map((section) => (
            <div key={section.name}>
              {!collapsed && (
                <h3 className="px-3 text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wider mb-2">
                  {section.name}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed ? "px-2" : "px-3"
                    )}
                    asChild
                  >
                    <Link to={item.href}>
                      <item.icon
                        className={cn("h-4 w-4", collapsed ? "" : "mr-3")}
                      />
                      {!collapsed && item.name}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed ? "px-2" : "px-3"
          )}
          onClick={() => {
            try {
              localStorage.removeItem("username");
              localStorage.removeItem("userRole");
            } catch {}
            window.location.href = "/login";
          }}
        >
          <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
          {!collapsed && "Sign Out"}
        </Button>
      </div>
    </div>
  );
}
