import { ArrowRight, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 text-xs flex items-center gap-2"
      style={{
        color: "var(--muted)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10, 13, 19, 0.5)",
      }}
    >
      <Info size={12} className="shrink-0" />
      <span>
        Scores are illustrative, relative comparisons for teaching the trilemma trade-off — not precise
        benchmarks, and real-world figures shift as protocols upgrade.
      </span>
    </footer>
  );
}
