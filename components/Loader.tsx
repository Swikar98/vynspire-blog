"use client";

type LoaderProps = {
  message?: string;
  fullScreen?: boolean;
};

export const Loader = ({
  message = "Loading...",
  fullScreen = false,
}: LoaderProps) => {
  const content = (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-white/80 p-8 text-slate-700 shadow">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-r-transparent" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <div className="flex min-h-[320px] items-center justify-center">{content}</div>
  );
};
