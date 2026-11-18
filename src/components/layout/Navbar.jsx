import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "../../config/navigation.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"
      >
        {/* BRAND */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 font-mono text-lg font-bold text-purple-400 transition-all duration-300 group-hover:shadow-[0_0_25px_#a855f750]">
            &lt;/&gt;
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.15em] text-white">
              FINAL CHECK
            </span>

            <span className="text-[10px] tracking-[0.2em] text-purple-400">
              INTERVIEW SYSTEM
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `relative rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-purple-500/15 text-purple-300"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-4 -bottom-[17px] h-[2px] rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* INTERVIEW STATUS */}
        <div className="hidden items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/5 px-4 py-2 lg:flex">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />

          <span className="text-xs font-medium tracking-wide text-purple-300">
            INTERVIEW MODE
          </span>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 px-3 py-2 text-white md:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE NAVIGATION */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#09090f] px-6 py-4 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm transition-colors ${
                    isActive
                      ? "bg-purple-500/15 text-purple-300"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}