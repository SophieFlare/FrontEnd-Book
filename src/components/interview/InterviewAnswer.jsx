import {
  BsMic,
  BsCpu,
  BsCodeSlash,
  BsExclamationTriangle,
  BsQuestionCircle,
} from "react-icons/bs";

const Section = ({ icon: Icon, title, children }) => (
  <section className="min-w-0 space-y-2">
    <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
      <Icon size={16} className="shrink-0 text-white" aria-hidden="true" />
      <span>{title}</span>
    </h2>

    <div className="min-w-0 pl-6">{children}</div>
  </section>
);

export default function InterviewAnswer({ question }) {
  if (!question) return null;

  return (
    <article className="min-w-0 space-y-5 border-l border-violet-500/20 py-3 pl-3 text-xs text-zinc-300">
      {/* INTERVIEW ANSWER */}
      <Section icon={BsMic} title="Interview Answer">
        <p className="whitespace-pre-line leading-5 text-zinc-300">
          {question.answer || "Answer coming soon."}
        </p>
      </Section>

      {/* UNDER THE HOOD */}
      {question.underTheHood && (
        <Section icon={BsCpu} title="Under the Hood">
          <p className="whitespace-pre-line leading-5 text-zinc-400">
            {question.underTheHood}
          </p>
        </Section>
      )}

      {/* CODE EXAMPLE */}
      {question.code && (
        <Section icon={BsCodeSlash} title="Code Example">
          <pre className="max-w-full overflow-x-auto rounded border border-violet-500/15 bg-zinc-950 p-3 font-mono text-[11px] leading-5 text-zinc-200">
            <code>{question.code}</code>
          </pre>
        </Section>
      )}

      {/* COMMON PITFALLS */}
      {question.pitfalls?.length > 0 && (
        <Section icon={BsExclamationTriangle} title="Common Pitfalls">
          <ul className="space-y-1.5">
            {question.pitfalls.map((pitfall, index) => (
              <li
                key={index}
                className="flex items-start gap-2 leading-5 text-zinc-400"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                <span className="min-w-0">{pitfall}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* FOLLOW-UP QUESTIONS */}
      {question.followUps?.length > 0 && (
        <Section icon={BsQuestionCircle} title="Follow-up Questions">
          <ol className="space-y-1.5">
            {question.followUps.map((followUp, index) => (
              <li
                key={index}
                className="flex items-start gap-2 leading-5 text-zinc-400"
              >
                <span className="shrink-0 font-mono text-[10px] text-violet-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">{followUp}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}
    </article>
  );
}