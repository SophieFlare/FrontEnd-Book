import { useState } from "react";
import InterviewAnswer from "./InterviewAnswer.jsx";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import CategoryOverview from "./CategoryOverview.jsx";

export default function InterviewExplorer({ subject, content }) {
  const [category, setCategory] = useState(null);
  const [concept, setConcept] = useState(null);
  const [question, setQuestion] = useState(null);

  const concepts = category ? (content?.[category.id]?.concepts ?? []) : [];

  const questions = concept?.questions ?? [];

  function goBack() {
    if (question) setQuestion(null);
    else if (concept) setConcept(null);
    else setCategory(null);
  }

  function goHome() {
    setCategory(null);
    setConcept(null);
    setQuestion(null);
  }

  const items = question
    ? []
    : concept
      ? questions
      : category
        ? concepts
        : (subject.categories ?? []);

  function selectItem(item) {
    if (!category) {
      setCategory(item);
      setConcept(null);
      setQuestion(null);
    } else if (!concept) {
      setConcept(item);
      setQuestion(null);
    } else {
      setQuestion(item);
    }
  }

  const title =
    question?.title ||
    question?.question ||
    concept?.title ||
    category?.title ||
    subject.title;

  return (
    <section className="w-full min-w-0 text-zinc-300">
      {/* HEADER */}
      <header className="mb-3 flex min-w-0 items-center gap-2 border-b border-white/10 pb-3">
        {category && (
          <button
            type="button"
            onClick={goBack}
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
            / {title}
          </span>
        )}
      </header>

      {/* EXPLORER ITEMS */}
      {!question && (
        <div className="space-y-0.5">
          {items.map((item, index) => (
            <button
              key={item.id ?? index}
              type="button"
              onClick={() => selectItem(item)}
              title={item.title || item.question || ""}
              className="
                group flex w-full min-w-0
                items-center gap-2
                rounded px-2 py-2
                text-left text-xs
                transition-colors
                hover:bg-violet-500/10
                hover:text-violet-300
              "
            >
              <span className="w-5 shrink-0 font-mono text-[10px] text-zinc-600">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="min-w-0 flex-1 truncate">
                {item.title || item.question}
              </span>
<BsChevronRight
  size={12}
  className="shrink-0 text-white transition group-hover:text-violet-400"
/>
            </button>
          ))}

          {items.length === 0 && (
            <p className="px-2 py-3 text-xs text-zinc-600">No content yet.</p>
          )}
        </div>
      )}

      {/* ANSWER */}
      {question && (
        <div className="min-w-0 overflow-x-auto">
          <InterviewAnswer question={question} />
        </div>
      )}
    </section>
  );
}

