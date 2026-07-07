import { Sparkles, Info } from "lucide-react";
import IconByName from "./IconByName";

export default function AlgorithmOverview({ algorithm }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Hero card with large icon + core info */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${algorithm.color}, ${algorithm.color}44)` }} />
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${algorithm.color}12` }}
            >
              <IconByName name={algorithm.id} size={28} color={algorithm.color} />
            </div>
            <div className="min-w-0 pt-1">
              <h2 className="text-lg font-semibold tracking-tight">{algorithm.name}</h2>
              <p className="text-sm mt-0.5" style={{ color: algorithm.color }}>
                {algorithm.tagline}
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed mt-4" style={{ color: "var(--text-2)" }}>
            {algorithm.coreMechanism}
          </p>
        </div>
      </div>

      {/* Steps + Strength/Tradeoff side by side */}
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-5">
        {/* Steps - blockchain block style */}
        <div
          className="rounded-xl p-5"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-3)" }}>
            Protocol Steps
          </h3>
          <div className="space-y-0">
            {algorithm.stepByStepExplanation.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold shrink-0"
                    style={{
                      background: `${algorithm.color}12`,
                      color: algorithm.color,
                      border: `1px solid ${algorithm.color}30`,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < algorithm.stepByStepExplanation.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: `linear-gradient(180deg, ${algorithm.color}30, ${algorithm.color}08)` }} />
                  )}
                </div>
                <div className="pb-5 pt-1">
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strength + Tradeoff stacked */}
        <div className="flex flex-col gap-5">
          <div
            className="rounded-xl p-5 flex-1 flex flex-col justify-center"
            style={{
              background: `linear-gradient(135deg, ${algorithm.color}06, transparent)`,
              border: `1px solid ${algorithm.color}20`,
            }}
          >
            <p className="text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider mb-2" style={{ color: algorithm.color }}>
              <Sparkles size={12} /> Strength
            </p>
            <p className="text-sm leading-relaxed">{algorithm.strength}</p>
          </div>
          <div
            className="rounded-xl p-5 flex-1 flex flex-col justify-center"
            style={{
              background: `linear-gradient(135deg, transparent, var(--surface-2))`,
              border: "1px solid var(--border)",
            }}
          >
            <p className="text-xs flex items-center gap-1.5 font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-3)" }}>
              <Info size={12} /> Trade-off
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              {algorithm.tradeoff}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
