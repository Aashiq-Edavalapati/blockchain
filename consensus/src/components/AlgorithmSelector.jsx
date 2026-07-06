import { motion } from "framer-motion";
import IconByName from "./IconByName";

export default function AlgorithmSelector({ algorithms, activeId, onSelect }) {
  return (
    <nav
      role="tablist"
      aria-label="Select a consensus algorithm"
      className="px-6 md:px-10 max-w-7xl mx-auto flex gap-3 flex-wrap mb-10 sticky top-0 z-20 py-4"
      style={{ background: "linear-gradient(to bottom, var(--bg) 70%, transparent)" }}
    >
      {algorithms.map((a) => {
        const isActive = a.id === activeId;
        return (
          <button
            key={a.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(a.id)}
            className="algo-btn relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
            style={{
              background: isActive ? a.color + "20" : "var(--surface)",
              border: `1px solid ${isActive ? a.color : "var(--border)"}`,
              color: isActive ? a.color : "var(--muted)",
            }}
          >
            <IconByName name={a.iconName} size={15} />
            {a.shortName}
            {isActive && (
              <motion.span
                layoutId="active-dot"
                className="w-1.5 h-1.5 rounded-full ml-1"
                style={{ background: a.color }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
