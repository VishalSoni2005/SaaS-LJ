"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  History,
  Users,
  LogOut,
  Bell,
  Search,
  Sparkles,
  X,
  PenToolIcon as Tool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/ui/use-toast";
import { Suspense } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { get } from "http";
import {
  getCurrentUser,
  getCurrentUserClient,
} from "@/lib/actions/auth.action";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      const Curr_user = await getCurrentUserClient();
      if (Curr_user) setUser(user);
    };
    fetchUser();
  });

  //  const user = { name: "vishal", email: "lakhiJewe@gmail.com" };

  // Handle logout
  const handleLogout = () => {
    // logout()
    // sessionStorage.removeItem("session");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation items for reuse
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/create-bill", label: "Create Bill", icon: FileText },
    { href: "/dashboard/bill-history", label: "Bill History", icon: History },
    {
      href: "/dashboard/repairs-orders",
      label: "Repairs & Orders",
      icon: Tool,
    },
    { href: "/dashboard/customers", label: "Customers", icon: Users },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 z-50 hidden md:flex w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}>
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <Sparkles className="h-6 w-6 text-amber-500" />
          <span className="text-lg font-bold">Lakhi Jewellers</span>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "default"
                  : "ghost"
              }
              className={`w-full justify-start ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : ""
              }`}
              asChild>
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
          {/* Mobile Sidebar Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden">
                <span className="sr-only">Toggle Menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6">
                  <line
                    x1="4"
                    x2="20"
                    y1="12"
                    y2="12"
                  />
                  <line
                    x1="4"
                    x2="20"
                    y1="6"
                    y2="6"
                  />
                  <line
                    x1="4"
                    x2="20"
                    y1="18"
                    y2="18"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[250px] sm:w-[300px] p-0">
              <div className="flex h-16 items-center gap-2 border-b px-6">
                <Sparkles className="h-6 w-6 text-amber-500" />
                <span className="text-lg font-bold">Lakhi Jewellers</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => {
                    const element = document.querySelector(
                      "[data-radix-collection-item]"
                    ) as HTMLElement | null;
                    element?.click();
                  }}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                        ? "default"
                        : "ghost"
                    }
                    className={`w-full justify-start ${
                      pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                        ? "bg-amber-500 hover:bg-amber-600 text-white"
                        : ""
                    }`}
                    asChild>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Link>
                  </Button>
                ))}
                <div className="pt-4 mt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="relative flex-1 md:grow-0 md:basis-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Suspense
              fallback={
                <input
                  type="search"
                  placeholder="Searching..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3"
                  disabled
                />
              }>
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-2/3"
              />
            </Suspense>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-500">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium">
                  {user?.name || "User"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user?.email || "user@example.com"}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
