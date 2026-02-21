"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-black shadow-2xl border-b border-zinc-800/50 backdrop-blur-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent hover:from-zinc-200 hover:via-zinc-400 hover:to-zinc-500 transition-all duration-300"
        >
          Task Manager
        </Link>
        <button
          onClick={handleLogout}
          className="text-zinc-400 hover:text-red-400 font-medium px-4 py-2 rounded-lg hover:bg-zinc-800/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
