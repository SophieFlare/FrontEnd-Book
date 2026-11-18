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

export default function OverviewQuestion({ question, index }) {
  const [expanded, setExpanded] = useState(false);
  const summary = getSummary(question);

  return (
    <article className="group/question min-w-0 border-b border-white/10">
      {/* QUESTION HEADER */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className={`
          flex w-full cursor-pointer items-center gap-2
          px-2 py-3 text-left transition-colors
          hover:bg-violet-500/15
          ${expanded ? "bg-violet-500/10" : ""}
        `}
      >
        <span className="w-5 shrink-0 font-mono text-[10px] text-zinc-500">
          {String(index).padStart(2, "0")}
        </span>

        <span
          className={`min-w-0 flex-1 text-xs font-semibold ${
            expanded ? "text-violet-300" : "text-zinc-200"
          }`}
        >
          {question.shortTitle || question.title}
        </span>

        <span className="text-violet-400">
          {expanded ? (
            <BsChevronDown size={12} />
          ) : (
            <BsChevronRight size={12} />
          )}
        </span>
      </button>

      {/* SUMMARY + KEYWORDS */}
      {!expanded && (summary || question.keywords?.length > 0) && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-full cursor-pointer px-2 pb-3 pl-9 text-left"
        >
          <div className="space-y-2 blur-[1.5px] opacity-65 transition-all duration-300 group-hover/question:blur-none group-hover/question:opacity-100">
            {summary && (
              <p className="text-xs leading-5 text-zinc-400">
                {summary}
              </p>
            )}

            <OverviewKeywords items={question.keywords} />
          </div>
        </button>
      )}

      {/* FULL ANSWER */}
      {expanded && (
        <div className="space-y-4 px-3 pb-5 pl-9">
          <OverviewKeywords items={question.keywords} />

          <Detail
            label="Interview Answer"
            value={question.answer || question.interviewAnswer}
          />

          <Detail
            label="Under the Hood"
            value={question.underTheHood}
          />

          {question.code && (
            <div className="space-y-2">
              <h6 className="font-mono text-[10px] uppercase tracking-wider text-violet-400">
                Code Example
              </h6>

              <pre className="overflow-x-auto rounded border border-white/10 bg-black/30 p-3 font-mono text-[11px] leading-5 text-zinc-300">
                <code>{question.code}</code>
              </pre>
            </div>
          )}

          <Detail label="Pitfalls" value={question.pitfalls} />

          <Detail label="Follow-ups" value={question.followUps} />

          <Detail label="Quick Recall" value={question.recall} />
        </div>
      )}
    </article>
  );
}