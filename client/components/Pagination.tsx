"use client";

interface Props {
  page: number;
  total: number;
  limit: number;
  setPage: (p: number) => void;
}

export default function Pagination({ page, total, limit, setPage }: Props) {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex space-x-2 mt-6">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            p === page
              ? "bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 text-zinc-100 shadow-lg shadow-zinc-800/50 ring-2 ring-zinc-600"
              : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:bg-zinc-800/70 hover:text-zinc-200 hover:border-zinc-700"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
