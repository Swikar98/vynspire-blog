"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { cn } from "@/lib/utils";
import {  NAV_LINKS } from "@/types/navTypes";
import { AppShellProps } from "@/types/appShell";

export const Dashboard_Layout = ({
  title,
  description,
  actions,
  children,
}: AppShellProps) => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="text-lg font-semibold text-slate-900"
            >
              Vynspire Blog
            </Link>
            <nav className="mt-3 flex items-center gap-3 text-sm text-slate-600">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1 font-medium transition",
                    pathname === link.href
                      ? "bg-emerald-100 text-emerald-800"
                      : "hover:text-slate-900",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="text-left text-sm">
              <p className="font-semibold text-slate-900">{user?.name}</p>
              <p className="text-slate-500">{user?.email}</p>
            </div>
            <Button variant="ghost" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        {(title || description || actions) && (
          <div className="flex flex-col gap-3 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:flex-row sm:items-center sm:justify-between">
            <div>
              {title && (
                <h1 className="text-xl font-semibold text-slate-900">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-1 text-sm text-slate-500">{description}</p>
              )}
            </div>
            {actions}
          </div>
        )}
        {children}
      </main>
    </div>
  );
};
