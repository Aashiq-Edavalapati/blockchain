import { motion } from "framer-motion";

export default function HowItWorks({ algorithm, prefersReduced }) {
  return (
    <div
      className="card-glass p-6 md:p-8 relative"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-3 bottom-3 w-px" style={{ background: "var(--border)" }} />

        {/* Animated dot */}
        {!prefersReduced && (
          <motion.div
            className="absolute left-[15px] w-[9px] h-[9px] rounded-full z-10"
            style={{
              background: algorithm.color,
              boxShadow: `0 0 12px ${algorithm.color}`,
            }}
            animate={{ top: ["0.75%", "98%"] }}
            transition={{ duration: algorithm.pulseDuration, repeat: Infinity, ease: "linear" }}
          />
        )}

        <ol className="space-y-6">
          {algorithm.stepByStepExplanation.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.04 * i }}
              className="relative pl-12 text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              <span
                className="absolute left-0 top-0 w-[38px] h-[38px] rounded-full flex items-center justify-center font-mono text-xs font-semibold z-10"
                style={{
                  background: "var(--surface)",
                  border: `1.5px solid ${algorithm.color}55`,
                  color: algorithm.color,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
