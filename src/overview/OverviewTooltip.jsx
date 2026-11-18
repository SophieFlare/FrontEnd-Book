export default function OverviewTooltip({ tooltip }) {
  if (!tooltip) return null;

  const width = 220;
  const estimatedHeight = 40 + tooltip.topics.length * 20;

  const left = Math.max(
    8,
    Math.min(tooltip.x, window.innerWidth - width - 8),
  );

  const top = Math.max(
    8,
    Math.min(tooltip.y, window.innerHeight - estimatedHeight - 8),
  );

  return (
    <div
      role="tooltip"
      className="
        pointer-events-none fixed z-[9999]
        w-[220px] rounded-md
        border border-violet-500/30
        bg-zinc-950/95 p-3
        shadow-2xl backdrop-blur-md
      "
      style={{ left, top }}
    >
      <p className="mb-2 font-mono text-[10px] font-semibold text-violet-300">
        {tooltip.title}
      </p>

      <div className="space-y-1">
        {tooltip.topics.map((topic, index) => (
          <p
            key={`${topic}-${index}`}
            className="text-[10px] leading-4 text-zinc-400"
          >
            <span className="mr-2 text-violet-500">›</span>
            {topic}
          </p>
        ))}
      </div>
    </div>
  );
}