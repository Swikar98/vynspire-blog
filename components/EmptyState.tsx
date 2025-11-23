"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export const EmptyState = ({
  title,
  description,
  actionHref,
  actionLabel = "Create post",
}: EmptyProps) => (
  <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
    <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      Nothing to show
    </div>
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-500">{description}</p>
    </div>
    {actionHref && (
      <Button asChild>
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    )}
  </div>
);
