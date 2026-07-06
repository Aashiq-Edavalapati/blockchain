import { motion } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import IconByName from "./IconByName";

export default function AlgorithmOverview({ algorithm, prefersReduced }) {
  return (
    <div
      className="rounded-2xl p-6 md:p-8"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: algorithm.color + "22", color: algorithm.color }}
        >
          <IconByName name={algorithm.iconName} size={20} />
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold">{algorithm.name}</h2>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{algorithm.tagline}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {algorithm.coreMechanism}
      </p>

      <div className="mt-8 relative">
        <div className="absolute left-[15px] top-2 bottom-2 w-px" style={{ background: "var(--border)" }} />
        {!prefersReduced && (
          <motion.div
            className="absolute left-[11px] w-2 h-2 rounded-full"
            style={{ background: algorithm.color, boxShadow: `0 0 10px ${algorithm.color}` }}
            animate={{ top: ["1%", "97%"] }}
            transition={{ duration: algorithm.pulseDuration, repeat: Infinity, ease: "linear" }}
          />
        )}
        <ol className="space-y-5">
          {algorithm.stepByStepExplanation.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.05 * i }}
              className="relative pl-10 text-sm leading-relaxed"
            >
              <span
                className="absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: algorithm.color }}
              >
                {i + 1}
              </span>
              {step}
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mt-8">
        <div className="rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <Sparkles size={13} /> Strength
          </p>
          <p className="text-sm mt-1">{algorithm.strength}</p>
        </div>
        <div className="rounded-xl p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--muted)" }}>
            <Info size={13} /> Trade-off
          </p>
          <p className="text-sm mt-1">{algorithm.tradeoff}</p>
        </div>
      </div>
    </div>
  );
}
