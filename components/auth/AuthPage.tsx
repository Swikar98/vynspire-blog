"use client";

import { AuthPageProps } from "@/types/auth";
import Link from "next/link";

export const AuthPage = ({
  title,
  subtitle,
  footer,
  children,
}: AuthPageProps) => (
  <div className="flex min-h-screen flex-col justify-center bg-gradient-to-br from-blue-200 via-blue-100 to-slate-blue-50 px-4 py-10 text-slate-50">
    <div className="mx-auto grid w-full max-w-5xl gap-10 rounded-[32px] bg-white/5 p-8 shadow-2xl ring-1 ring-white/10 md:grid-cols-[1.2fr,1fr]">
      <div className="rounded-3xl bg-blue-600 p-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-300">
          Vynspire Blog
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-3 text-base text-slate-200">{subtitle}</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-lg text-slate-900">
        {children}
        <div className="mt-8 text-center text-sm text-slate-500">{footer}</div>
      </div>
    </div>
    <p className="mt-6 text-center text-xs text-slate-400">
      Built for Vynspire developer assessment. Need help?{" "}
      <Link href="mailto:support@vynspire.dev" className="underline">
        support@vynspire.dev
      </Link>
    </p>
  </div>
);
