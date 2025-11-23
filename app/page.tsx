import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-blue-100 text-slate-50">
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">
          Vynspire Blog Platform
        </div>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold leading-tight text-black sm:text-5xl">
            Ship blog content faster with a modern editorial dashboard.
          </h1>
          <p className="text-lg text-black">
            Manage authentication, draft new stories, edit existing posts, and
            keep your publishing calendar on track — all inside a clean React +
            Next.js experience built for this assignment.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition "
          >
            Open dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-black/30 px-8 py-3 text-sm font-semibold text-black transition"
          >
            Sign in
          </Link>
        </div>

      </main>
    </div>
  );
}
