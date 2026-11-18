import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

import CategoryOverview from "../../overview/CategoryOverview.jsx";

export default function InterviewExplorer({ subject, content }) {
  const [category, setCategory] = useState(null);

  const concepts = category
    ? (content?.[category.id]?.concepts ?? [])
    : [];

  function goHome() {
    setCategory(null);
  }

  const overview = category
    ? content?.[category.id]?.overview
    : null;

  return (
    <section className="flex min-h-full w-full min-w-0 flex-col text-zinc-300">
      {/* HEADER */}
      <header className="mb-3 flex min-w-0 shrink-0 items-center gap-2 border-b border-white/10 pb-3">
        {category && (
          <button
            type="button"
            onClick={goHome}
            aria-label="Go back"
            className="shrink-0 text-zinc-500 transition hover:text-violet-400"
          >
            <BsChevronLeft size={12} />
          </button>
        )}

        <button
          type="button"
          onClick={goHome}
          title="Back to subject"
          className="shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wider text-violet-400"
        >
          {subject.title}
        </button>

        {category && (
          <span className="min-w-0 truncate text-xs text-zinc-400">
            / {category.title}
          </span>
        )}
      </header>

      {/* CATEGORY NAVIGATION */}
      {!category && (
        <div className="space-y-0.5">
          {(subject.categories ?? []).map((item, index) => (
            <button
              key={item.id ?? index}
              type="button"
              onClick={() => setCategory(item)}
              className="
                group flex w-full min-w-0
                items-center gap-2 rounded
                px-2 py-2 text-left text-xs
                transition-colors
                hover:bg-violet-500/10
                hover:text-violet-300
              "
            >
              <span className="w-5 shrink-0 font-mono text-[10px] text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 truncate">
                {item.title}
              </span>

              <BsChevronRight
                size={12}
                className="shrink-0 text-white transition group-hover:text-violet-400"
              />
            </button>
          ))}
        </div>
      )}

      {/* GLOBAL OVERVIEW — MAIN WORKSPACE */}
      {category && (
        <div className="min-w-0">
          <CategoryOverview
            concepts={concepts}
            overview={overview}
          />
        </div>
      )}
    </section>
  );
}