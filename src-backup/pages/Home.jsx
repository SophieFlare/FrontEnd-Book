import { Link } from "react-router-dom";
import { navigation } from "../config/navigation";

export default function Home() {
  return (
    <section className="py-24">
      <div className="mb-20 max-w-4xl">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />

          <span className="font-mono text-xs tracking-widest text-purple-300">
            FINAL INTERVIEW PREPARATION
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Master the concepts.
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            Own the interview.
          </span>
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
          Your personal knowledge system for mastering JS, TS,
          R^ and Redux — from fundamentals to advanced interview-level
          understanding.
        </p>
      </div>

      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-5">
        <h2 className="text-xl font-semibold">Select Your Domain</h2>

        <span className="font-mono text-xs text-zinc-500">04 CORE DOMAINS</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {navigation.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#11111a] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-[0_15px_60px_#7c3aed15]"
          >
            <div className="mb-12 flex items-center justify-between">
              <span className="font-mono text-xs tracking-widest text-zinc-500">
                DOMAIN {String(index + 1).padStart(2, "0")}
              </span>

              <span className="text-xl text-zinc-600 transition-all group-hover:text-purple-400">
                ↗
              </span>
            </div>

            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 font-mono text-lg font-bold text-purple-400">
              {item.short}
            </div>

            <h3 className="mb-3 text-3xl font-bold">{item.label}</h3>

            <p className="text-sm text-zinc-400">{item.description}</p>

            <div className="mt-10 flex items-center gap-3 text-sm font-medium text-purple-400">
              Explore modules
              <span className="transition-transform group-hover:translate-x-2">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
