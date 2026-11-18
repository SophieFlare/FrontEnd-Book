import { useState } from "react";

export default function SubjectPage({
  title,
  short,
  description,
  topics = [],
}) {
  const [search, setSearch] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16">
      {/* HEADER */}
      <div className="mb-12">
        <span className="mb-5 inline-block rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 font-mono text-xs text-purple-400">
          {short} / FINAL CHECK
        </span>

        <h1 className="mb-5 text-5xl font-bold tracking-tight md:text-7xl">
          {title}
          <span className="text-purple-500">.</span>
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-10">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder={`Search ${title} topics...`}
          aria-label={`Search ${title} topics`}
          className="w-full rounded-xl border border-white/10 bg-[#11111a] px-5 py-4 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-purple-500/60"
        />
      </div>

      {/* TOPICS */}
      <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
        <h2 className="text-xl font-semibold">
          Knowledge Modules
        </h2>

        <span className="font-mono text-xs text-zinc-500">
          {filteredTopics.length} / {topics.length} TOPICS
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTopics.map((topic) => (
          <article
            key={topic}
            className="group rounded-xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-500/[0.04]"
          >
            <h3 className="mb-3 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
              {topic}
            </h3>

            <p className="text-sm text-zinc-500">
              Interview answers • Examples • Pitfalls
            </p>
          </article>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <p className="py-12 text-center text-zinc-500">
          No matching topics found.
        </p>
      )}
    </section>
  );
}