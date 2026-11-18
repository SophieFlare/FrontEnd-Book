import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";
import OverviewKeywords from "./OverviewKeywords.jsx";
import { getSummary } from "./overviewUtils.js";

function Detail({ label, value }) {
  if (!value || (Array.isArray(value) && !value.length)) return null;

  return (
    <div className="space-y-1">
      <h6 className="font-mono text-[10px] uppercase tracking-wider text-violet-400">
        {label}
      </h6>

      <p className="whitespace-pre-line text-xs leading-5 text-zinc-400">
        {Array.isArray(value) ? value.join("\n") : value}
      </p>
    </div>
  );
}

export default function OverviewQuestion({ question, index, onQuestionClick }) {
  const [expanded, setExpanded] = useState(false);
  const summary = getSummary(question);

  return (
    <article className="group/question min-w-0 border-b border-white/10 transition-colors hover:bg-violet-500/5">
      {/* QUESTION HEADER → NAVIGATE */}
      <div className="flex min-w-0 items-stretch rounded transition-colors hover:bg-violet-500/15">
        <button
          type="button"
          onClick={onQuestionClick}
          className="group/header flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-3 text-left"
        >
          <span className="w-5 shrink-0 font-mono text-[10px] text-zinc-600 transition-colors group-hover/header:text-violet-400">
            {String(index).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1 text-xs font-semibold text-zinc-200 transition-colors group-hover/header:text-violet-300">
            {question.shortTitle || question.title}
          </span>
        </button>

        {/* ARROW → EXPAND / COLLAPSE */}
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse details" : "Expand details"}
          className="flex shrink-0 cursor-pointer items-center px-3 text-zinc-500 transition-colors hover:text-violet-400"
        >
          {expanded ? (
            <BsChevronDown size={12} />
          ) : (
            <BsChevronRight size={12} />
          )}
        </button>
      </div>

      {/* SUMMARY + KEYWORDS → BLUR / REVEAL */}
      {(summary || question.keywords?.length > 0) && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="w-full cursor-pointer px-2 pb-3 pl-9 text-left"
        >
          <div
            className={`
              space-y-2 transition-all duration-300 ease-out
              ${
                expanded
                  ? "blur-none opacity-100"
                  : "blur-[1.5px] opacity-65 group-hover/question:blur-none group-hover/question:opacity-100"
              }
            `}
          >
            {summary && (
              <p className="text-xs leading-5 text-zinc-400">{summary}</p>
            )}

            <OverviewKeywords items={question.keywords} />
          </div>
        </button>
      )}

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div className="mb-4 ml-9 min-w-0 space-y-3 border-l border-violet-500/30 pl-3">
          <Detail label="Under the Hood" value={question.underTheHood} />

          <Detail label="Pitfalls" value={question.pitfalls} />

          <Detail label="Follow-ups" value={question.followUps} />

          <Detail label="Recall" value={question.recall} />
        </div>
      )}
    </article>
  );
}
