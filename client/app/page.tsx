import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { FiLock, FiArrowRight, FiZap, FiShield, FiTarget, FiCheckCircle } from "react-icons/fi";
import { RiShieldCheckLine } from "react-icons/ri";
import { BsLightningChargeFill, BsShieldLockFill } from "react-icons/bs";
import { MdDashboard, MdNotifications } from "react-icons/md";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-slate-900 flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-6xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-600 to-zinc-800 blur-2xl opacity-30 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-zinc-800 via-zinc-900 to-black p-5 rounded-3xl shadow-2xl ring-1 ring-zinc-700/50 hover:ring-zinc-600/60 transition-all duration-300">
              <HiSparkles className="w-14 h-14 text-zinc-300 animate-pulse" />
            </div>
          </div>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-full text-sm text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
          </span>
          Trusted by 10,000+ teams worldwide
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent leading-tight tracking-tight">
          Welcome to Task Manager
        </h1>

        <p className="text-2xl md:text-3xl text-zinc-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
          Organize your work, boost productivity, and achieve your goals with
          our powerful task management platform.
        </p>

        <p className="text-lg text-zinc-500 mb-14 flex items-center justify-center gap-2">
          <FiCheckCircle className="w-5 h-5 text-green-500" />
          Get started in seconds — no credit card required
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-20">
          <Link
            href="/login"
            className="group flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 hover:from-zinc-200 hover:via-zinc-300 hover:to-zinc-400 text-black font-bold rounded-2xl shadow-2xl hover:shadow-zinc-700/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zinc-400 focus:ring-offset-4 focus:ring-offset-zinc-900 transform hover:scale-105"
          >
            <FiLock className="w-5 h-5" />
            Sign In to Dashboard
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>

          <Link
            href="/register"
            className="group flex items-center gap-3 px-10 py-5 bg-zinc-900/60 hover:bg-zinc-800/80 text-zinc-200 hover:text-zinc-50 font-bold rounded-2xl border-2 border-zinc-700 hover:border-zinc-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-zinc-600 focus:ring-offset-4 focus:ring-offset-zinc-900 backdrop-blur-xl transform hover:scale-105"
          >
            <RiShieldCheckLine className="w-5 h-5" />
            Create Free Account
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-xl hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-800/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-5 flex justify-center">
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 rounded-xl ring-1 ring-yellow-500/30">
                <BsLightningChargeFill className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="text-xl text-zinc-100 font-bold mb-3">Lightning Fast</h3>
            <p className="text-zinc-400 leading-relaxed">
              Instant sync across all your devices with real-time collaboration
            </p>
          </div>

          <div className="group bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-xl hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-800/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-5 flex justify-center">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-4 rounded-xl ring-1 ring-blue-500/30">
                <BsShieldLockFill className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="text-xl text-zinc-100 font-bold mb-3">
              Secure & Private
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Enterprise-grade encryption keeps your data safe and private
            </p>
          </div>

          <div className="group bg-gradient-to-b from-zinc-900/60 to-zinc-950/60 p-8 rounded-2xl border border-zinc-800/60 backdrop-blur-xl hover:border-zinc-700 hover:shadow-2xl hover:shadow-zinc-800/30 transition-all duration-300 transform hover:-translate-y-2">
            <div className="mb-5 flex justify-center">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-4 rounded-xl ring-1 ring-purple-500/30">
                <FiTarget className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="text-xl text-zinc-100 font-bold mb-3">Stay Focused</h3>
            <p className="text-zinc-400 leading-relaxed">
              AI-powered prioritization and smart reminders keep you on track
            </p>
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-zinc-900/40 via-zinc-800/40 to-zinc-900/40 backdrop-blur-2xl p-12 rounded-3xl border border-zinc-700/50 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MdDashboard className="w-8 h-8 text-zinc-400" />
              <h2 className="text-3xl font-bold text-zinc-100">Ready to transform your workflow?</h2>
            </div>
            <p className="text-zinc-400 text-lg mb-8">
              Join thousands of teams already achieving more with Task Manager
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>No credit card needed</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}