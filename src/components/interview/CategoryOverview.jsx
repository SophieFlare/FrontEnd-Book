export default function CategoryOverview({ concepts = [] }) {
  return (
    <section className="min-w-0 shrink-0 border-b border-white/10 pb-4">
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-widest text-violet-400">
        Global Overview
      </h2>

      <div className="space-y-3">
        {concepts.map((concept) => (
          <div key={concept.id} className="min-w-0">
            <h3 className="mb-1 text-xs font-medium text-zinc-200">
              {concept.title}
            </h3>

            <div className="flex flex-wrap gap-1">
              {(concept.questions ?? []).map((question) => (
                <span
                  key={question.id}
                  className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                >
                  {question.keyword || question.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}