import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

import OverviewQuestion from "./OverviewQuestion.jsx";
import OverviewKeywords from "./OverviewKeywords.jsx";
import { getSections } from "./overviewUtils.js";

export default function CategoryOverview({
  concepts = [],
  overview,
  onQuestionClick,
}) {
  const sections = getSections(concepts, overview);

  // First section expanded by default
  const [expandedSections, setExpandedSections] = useState({});

  function toggleSection(sectionId) {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !(prev[sectionId] ?? sectionId === sections[0]?.id),
    }));
  }

  let questionNumber = 0;

  return (
    <section className="min-w-0 border-b border-white/10 pb-5">
      {/* GLOBAL HEADER */}
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-violet-400">
        Global Overview
      </h2>

      {overview?.title && (
        <h3 className="mb-2 text-sm font-semibold text-white">
          {overview.title}
        </h3>
      )}

      {overview?.introduction && (
        <p className="mb-3 text-xs leading-5 text-zinc-400">
          {overview.introduction}
        </p>
      )}

      <OverviewKeywords items={overview?.keywords} />

      {/* COLLAPSIBLE CONCEPT SECTIONS */}
      <div className="mt-5 space-y-2">
        {sections.map((section, sectionIndex) => {
          const isExpanded = expandedSections[section.id] ?? sectionIndex === 0;

          const startIndex = questionNumber;

          questionNumber += section.questions?.length ?? 0;

          return (
            <div
              key={section.id}
              className="overflow-hidden rounded border border-white/10"
            >
              {/* CLICKABLE SECTION HEADER */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                aria-expanded={isExpanded}
                className={`
                  group flex w-full cursor-pointer items-center
                  gap-3 px-3 py-3 text-left transition-all duration-200
                  hover:bg-violet-500/15
                  ${
                    isExpanded
                      ? "bg-violet-500/10 text-violet-300"
                      : "text-zinc-300"
                  }
                `}
              >
                {/* SECTION NUMBER */}
                <span className="shrink-0 font-mono text-[10px] text-zinc-500">
                  {String(sectionIndex + 1).padStart(2, "0")}
                </span>

                {/* SECTION TITLE */}
                <span className="min-w-0 flex-1 text-xs font-semibold transition-colors group-hover:text-violet-300">
                  {section.title}
                </span>

                {/* QUESTION COUNT */}
                <span className="font-mono text-[10px] text-zinc-500">
                  {String(section.questions?.length ?? 0).padStart(2, "0")}
                </span>

                {/* CHEVRON */}
                <span className="text-violet-400">
                  {isExpanded ? (
                    <BsChevronDown size={13} />
                  ) : (
                    <BsChevronRight size={13} />
                  )}
                </span>
              </button>

              {/* EXPANDED SECTION */}
              {isExpanded && (
                <div className="border-t border-white/10 px-2 pb-2">
                  {section.definition && (
                    <p className="px-2 pt-3 text-xs leading-5 text-zinc-400">
                      {section.definition}
                    </p>
                  )}

                  {section.keywords?.length > 0 && (
                    <div className="px-2 pt-3">
                      <OverviewKeywords items={section.keywords} />
                    </div>
                  )}

                  {/* QUESTIONS */}
                  <div className="mt-2">
                    {(section.questions ?? []).map((question, index) => (
                      <OverviewQuestion
                        key={`${section.id}-${question.id}`}
                        question={question}
                        index={startIndex + index + 1}
                        onQuestionClick={() =>
                          onQuestionClick?.(section.id, question.id)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* QUICK RECALL */}
      {overview?.cheatSheet?.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-4">
          <h4 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-violet-400">
            Quick Recall
          </h4>

          <div className="space-y-1">
            {overview.cheatSheet.map((line, index) => (
              <p
                key={index}
                className="font-mono text-[11px] leading-5 text-zinc-400"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
