"use client";

import { POST_CATEGORIES } from "@/constants/post";
import { Input } from "@/components/ui/input";

type PostFiltersProps = {
  searchTerm: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export const PostFilters = ({
  searchTerm,
  category,
  onSearchChange,
  onCategoryChange,
}: PostFiltersProps) => (
  <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:grid-cols-[2fr,1fr]">
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Search posts
      </label>
      <Input
        className="mt-2"
        placeholder="Search by keyword..."
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
    <div>
      <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        Category
      </label>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm text-slate-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      >
        <option value="all">All categories</option>
        {POST_CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  </div>
);
