"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "../../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/dashboard");
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
      toast.success("Logged in");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl border border-zinc-800/50 ring-1 ring-zinc-700/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Login
          </h2>
          <p className="text-sm text-zinc-500">
            Welcome back, sign in to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 p-3.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:border-zinc-600 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 hover:from-zinc-600 hover:via-zinc-500 hover:to-zinc-600 text-zinc-100 font-semibold p-3.5 rounded-lg shadow-lg hover:shadow-zinc-800/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
