import { useRef } from "react";
import IconByName from "./IconByName";

export default function AlgorithmSelector({ algorithms, activeId, onSelect }) {
  const scrollRef = useRef(null);



  return (
    <nav
      role="tablist"
      aria-label="Select a consensus algorithm"
      className="relative px-4 md:px-8 max-w-7xl mx-auto w-full"
      style={{ background: "var(--bg)" }}
    >
      <div
        ref={scrollRef}
        className="flex gap-2 py-3 overflow-x-auto scrollbar-thin"
        style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
      >
        {algorithms.map((a) => {
          const isActive = a.id === activeId;
          return (
            <button
              key={a.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(a.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0"
              style={{
                background: isActive ? `${a.color}10` : "var(--surface)",
                border: `1px solid ${isActive ? `${a.color}50` : "var(--border)"}`,
                color: isActive ? a.color : "var(--text-3)",
                boxShadow: isActive ? `0 0 0 1px ${a.color}20` : "none",
              }}
            >
              <span
                className="w-5 h-5 rounded flex items-center justify-center"
                style={{
                  background: isActive ? `${a.color}18` : "var(--surface-2)",
                }}
              >
                <IconByName name={a.id} size={10} />
              </span>
              <span>{a.shortName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
