"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Layers, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-4 w-4" />
            </div>
            <span>TodoList</span>
          </Link>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors"
          >
            <Layers className="h-4 w-4" />
            Categories
          </Link>
          <Link
            href="/settings"
            className="inline-flex items-center justify-center rounded-md p-2 hover:bg-muted hover:text-foreground transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
