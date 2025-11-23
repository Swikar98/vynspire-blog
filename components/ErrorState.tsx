"use client";

import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-center text-sm text-rose-900">
    <p className="font-medium">{message}</p>
    {onRetry && (
      <Button variant="secondary" onClick={onRetry}>
        Try again
      </Button>
    )}
  </div>
);
