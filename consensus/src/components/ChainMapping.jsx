import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { monogram } from "../utils/helpers";

export default function ChainMapping({ chains, algorithm }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="font-display text-lg font-semibold">Where {algorithm.shortName} runs today</h3>
        <div
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--muted)" }}
        >
          <Layers size={13} />
          L1 = secures itself · L2 = borrows security from an L1 below it
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chains.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            tabIndex={0}
            className="chain-card rounded-2xl p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                  style={{ background: algorithm.color + "22", color: algorithm.color, border: `1px solid ${algorithm.color}55` }}
                >
                  {monogram(c.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{c.name}</p>
                  <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{c.symbol}</p>
                </div>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-1 rounded-md shrink-0"
                style={{
                  background: c.layer === "L1" ? "#1F2A24" : "#2A2418",
                  color: c.layer === "L1" ? "#5FD98A" : "#E8B94C",
                }}
              >
                {c.layer}
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{c.why}</p>
            <div
              className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg inline-block"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              {c.lang}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
