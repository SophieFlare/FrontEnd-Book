export default function OverviewKeywords({ items = [] }) {
  if (!Array.isArray(items) || items.length === 0) return null;

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
}