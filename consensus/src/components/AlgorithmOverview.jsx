import { motion } from "framer-motion";
import { Sparkles, Info, BookText } from "lucide-react";
import IconByName from "./IconByName";

export default function AlgorithmOverview({ algorithm, prefersReduced }) {
  return (
    <div
      className="card-glass p-6 md:p-8"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: algorithm.color + "18", color: algorithm.color }}
        >
          <IconByName name={algorithm.iconName} size={20} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold">{algorithm.name}</h3>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{algorithm.tagline}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {algorithm.coreMechanism}
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mt-6">
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs flex items-center gap-1.5 font-semibold" style={{ color: algorithm.color }}>
            <Sparkles size={13} /> Strength
          </p>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>{algorithm.strength}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-xs flex items-center gap-1.5 font-semibold" style={{ color: algorithm.color }}>
            <BookText size={13} /> Trade-off
          </p>
          <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>{algorithm.tradeoff}</p>
        </div>
      </div>
    </div>
  );
}
