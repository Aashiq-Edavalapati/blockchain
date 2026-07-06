import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-8 max-w-7xl mx-auto text-xs flex items-center gap-2"
      style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
    >
      <ArrowRight size={13} />
      Scores are illustrative, relative comparisons for teaching the trilemma trade-off — not precise
      benchmarks, and real-world figures shift as protocols upgrade.
    </footer>
  );
}
