import { useState } from "react";
import { BsChevronDown, BsChevronRight } from "react-icons/bs";

const Detail = ({ label, value }) => {
  if (!value) return null;

  return (
    <div className="space-y-1">
      <h6 className="font-mono text-[10px] uppercase tracking-wider text-violet-400">
        {label}
      </h6>

      <p className="whitespace-pre-line text-xs leading-5 text-zinc-400">
        {value}
      </p>
    </div>
  );
};

const Keywords = ({ items = [] }) => {
  if (!items?.length) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded border border-violet-500/20 px-1.5 py-0.5 font-mono text-[10px] text-violet-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

function getSummary(question) {
  if (question.summary?.trim()) {
    return question.summary;
  }

  const source =
    question.summary ||
    question.interviewAnswer ||
    question.answer ||
    question.what ||
    "";
  if (!source.trim()) {
    return "";
  }

  const sentences = source.match(/[^.!?]+[.!?]+|[^.!?]+$/g);

  return (sentences ?? [source]).slice(0, 2).join(" ").trim();
}
function OverviewQuestion({ question, index, onQuestionClick }) {
  const [expanded, setExpanded] = useState(false);
  const summary = getSummary(question);

  return (
    <article className="min-w-0 border-b border-white/10 transition-colors hover:bg-violet-500/5">
      {/* FULL HEADER ROW */}
      <div className="group flex min-w-0 items-stretch rounded transition-colors hover:bg-violet-500/15">
        {/* CLICK ANYWHERE ON HEADER → FULL EXPLANATION */}
        <button
          type="button"
          onClick={onQuestionClick}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 px-2 py-3 text-left"
        >
          <span className="w-5 shrink-0 font-mono text-[10px] text-zinc-600 transition-colors group-hover:text-violet-400">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1 text-xs font-semibold text-zinc-200 transition-colors group-hover:text-violet-300">
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

      {/* ALWAYS VISIBLE */}
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        className="w-full cursor-pointer space-y-2 px-2 pb-3 pl-9 text-left"
      >
        {summary && (
          <p className="text-xs leading-5 text-zinc-400">{summary}</p>
        )}

        <Keywords items={question.keywords} />
      </button>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div className="mb-4 ml-9 min-w-0 space-y-3 border-l border-violet-500/30 pl-3">
          <Detail label="Under the Hood" value={question.underTheHood} />

          {question.pitfalls?.length > 0 && (
            <Detail label="Pitfalls" value={question.pitfalls.join("\n")} />
          )}

          {question.followUps?.length > 0 && (
            <Detail label="Follow-ups" value={question.followUps.join("\n")} />
          )}

          <Detail label="Recall" value={question.recall} />
        </div>
      )}
    </article>
  );
}

export default function CategoryOverview({
  concepts = [],
  overview,
  onQuestionClick,
}) {
  // Fallback for categories without _overview.json
  if (!overview) {
    return (
      <section className="min-w-0 border-b border-white/10 pb-4">
        <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-violet-400">
          Global Overview
        </h2>

        <div className="space-y-3">
          {concepts.map((concept) => (
            <div key={concept.id}>
              <h3 className="mb-1 text-xs font-medium text-zinc-200">
                {concept.title}
              </h3>

              <Keywords
                items={(concept.questions ?? []).map(
                  (question) => question.keyword || question.title,
                )}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  let questionNumber = 0;

  return (
    <section className="min-w-0 border-b border-white/10 pb-5">
      {/* GLOBAL HEADER */}
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-violet-400">
        Global Overview
      </h2>

      <h3 className="mb-2 text-sm font-semibold text-white">
        {overview.title}
      </h3>

      {overview.introduction && (
        <p className="mb-3 text-xs leading-5 text-zinc-400">
          {overview.introduction}
        </p>
      )}

      <Keywords items={overview.keywords} />

      {/* CONCEPT SECTIONS */}
      <div className="mt-5 space-y-6">
        {(overview.sections ?? []).map((section, sectionIndex) => (
          <div key={section.id}>
            <h4 className="mb-2 border-b border-white/10 pb-2 text-xs font-semibold text-zinc-200">
              {String(sectionIndex + 1).padStart(2, "0")} {section.title}
            </h4>

            {section.definition && (
              <p className="mb-2 text-xs leading-5 text-zinc-400">
                {section.definition}
              </p>
            )}

            <Keywords items={section.keywords} />

            {/* COLLAPSIBLE QUESTIONS */}
            <div className="mt-2">
           {(section.questions ?? []).map((question) => {
  questionNumber += 1;

  const sourceConcept = concepts.find(
    (concept) => concept.id === section.id,
  );

  const sourceQuestion = sourceConcept?.questions?.find(
    (item) => item.id === question.id,
  );

  const mergedQuestion = {
    ...question,
    ...sourceQuestion,
  };

  return (
    <OverviewQuestion
      key={question.id}
      question={mergedQuestion}
      index={questionNumber}
      onQuestionClick={() =>
        onQuestionClick?.(section.id, question.id)
      }
    />
  );
})}
                
            </div>
          </div>
        ))}
      </div>

      {/* QUICK RECALL */}
      {overview.cheatSheet?.length > 0 && (
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
