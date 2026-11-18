import { useState } from "react";

export default function useOverviewTooltip() {
  const [tooltip, setTooltip] = useState(null);

  function showTooltip(event, section) {
    setTooltip({
      title: section.title,
      topics: (section.questions ?? []).map(
        (q) => q.shortTitle || q.title,
      ),
      x: event.clientX + 16,
      y: event.clientY + 16,
    });
  }

  function moveTooltip(event) {
    setTooltip((prev) =>
      prev
        ? {
            ...prev,
            x: event.clientX + 16,
            y: event.clientY + 16,
          }
        : null,
    );
  }

  function hideTooltip() {
    setTooltip(null);
  }

  return {
    tooltip,
    showTooltip,
    moveTooltip,
    hideTooltip,
  };
}