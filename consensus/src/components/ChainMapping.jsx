import { motion } from "framer-motion";
import { Layers, Globe } from "lucide-react";
import { monogram } from "../utils/helpers";

export default function ChainMapping({ chains, algorithm }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h3 className="section-heading">Where {algorithm.shortName} runs today</h3>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full font-mono"
            style={{ background: `${algorithm.color}15`, color: algorithm.color }}
          >
            {chains.length} chain{chains.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--muted)" }}
        >
          <Layers size={13} />
          L1 = secures itself · L2 = borrows security
        </div>
      </div>
      <p className="section-sub mb-6">
        Blockchains that use {algorithm.name} or a variant of it in production.
      </p>

      {chains.length === 0 ? (
        <div
          className="card-glass p-8 text-center text-sm"
          style={{ color: "var(--muted)" }}
        >
          <Globe size={32} className="mx-auto mb-3 opacity-30" />
          No major chains currently use {algorithm.shortName} in production.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chains.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              whileHover={{ y: -3 }}
              tabIndex={0}
              className="chain-card card-glass p-5 cursor-default"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-semibold"
                    style={{
                      background: algorithm.color + "18",
                      color: algorithm.color,
                      border: `1px solid ${algorithm.color}40`,
                    }}
                  >
                    {monogram(c.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight truncate">{c.name}</p>
                    <p className="font-mono text-[11px]" style={{ color: "var(--muted)" }}>{c.symbol}</p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-1 rounded-md shrink-0"
                  style={{
                    background: c.layer === "L1" ? "rgba(95, 217, 138, 0.12)" : "rgba(232, 185, 76, 0.12)",
                    color: c.layer === "L1" ? "#5FD98A" : "#E8B94C",
                    border: `1px solid ${c.layer === "L1" ? "rgba(95, 217, 138, 0.2)" : "rgba(232, 185, 76, 0.2)"}`,
                  }}
                >
                  {c.layer}
                </span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted)" }}>{c.why}</p>
              <div
                className="text-[11px] font-mono px-2.5 py-1.5 rounded-lg inline-block max-w-full truncate"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                {c.lang}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
