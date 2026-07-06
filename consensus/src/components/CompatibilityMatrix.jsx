import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Unlink } from "lucide-react";
import compatibility from "../data/compatibility.js";

function pairKey(a, b) {
  return [a, b].sort().join("-");
}

export default function CompatibilityMatrix({ allChains, activeAlgorithm }) {
  const [hoverPair, setHoverPair] = useState(null);

  const compatMap = {};
  for (const p of compatibility) {
    compatMap[pairKey(p.chainA, p.chainB)] = p;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="font-display text-lg font-semibold">Cross-Chain Compatibility Matrix</h3>
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
          <span className="flex items-center gap-1.5">
            <Link2 size={13} style={{ color: activeAlgorithm.color }} /> Same mechanism
          </span>
          <span className="flex items-center gap-1.5"><Unlink size={13} /> Different mechanism</span>
        </div>
      </div>
      <p className="text-xs mb-4 max-w-2xl" style={{ color: "var(--muted)" }}>
        Rows and columns for the selected algorithm ({activeAlgorithm.shortName}) are highlighted. Hover any cell for a
        plain-language read on that pair's interoperability at the protocol level.
      </p>

      <div
        className="rounded-2xl p-4 overflow-auto scrollbar-thin relative"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", maxHeight: 560 }}
      >
        <table className="border-separate" style={{ borderSpacing: 3 }}>
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-20" style={{ background: "var(--surface)" }} />
              {allChains.map((c) => (
                <th key={c.id} className="sticky top-0 z-10" style={{ background: "var(--surface)" }}>
                  <div
                    className="font-mono text-[10px] px-1 py-2 -rotate-45 origin-bottom-left whitespace-nowrap w-6"
                    style={{ color: c.algo === activeAlgorithm.id ? activeAlgorithm.color : "var(--muted)" }}
                  >
                    {c.symbol}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allChains.map((rowChain) => (
              <tr key={rowChain.id}>
                <th className="sticky left-0 z-10 text-left pr-3" style={{ background: "var(--surface)" }}>
                  <span
                    className="font-mono text-[11px] whitespace-nowrap"
                    style={{ color: rowChain.algo === activeAlgorithm.id ? activeAlgorithm.color : "var(--muted)" }}
                  >
                    {rowChain.symbol}
                  </span>
                </th>
                {allChains.map((colChain) => {
                  const isSelf = rowChain.id === colChain.id;
                  const p = compatMap[pairKey(rowChain.id, colChain.id)];
                  const compatible = p ? p.sameConsensus : false;
                  const relatedToSelection =
                    rowChain.algo === activeAlgorithm.id || colChain.algo === activeAlgorithm.id;
                  const key = pairKey(rowChain.id, colChain.id);

                  const alpha = isSelf ? 1 : compatible ? (relatedToSelection ? 0.8 : 0.35) : relatedToSelection ? 0.55 : 0.2;

                  return (
                    <td key={colChain.id} className="p-0">
                      <button
                        className="cell-btn w-6 h-6 rounded-md transition-transform"
                        onMouseEnter={() => setHoverPair(key)}
                        onMouseLeave={() => setHoverPair((k) => (k === key ? null : k))}
                        onFocus={() => setHoverPair(key)}
                        style={{
                          background: isSelf
                            ? "var(--border)"
                            : compatible
                            ? activeAlgorithm.color + Math.round(alpha * 255).toString(16).padStart(2, "0")
                            : "var(--surface-2)",
                          opacity: relatedToSelection || compatible ? 1 : 0.55,
                          transform: hoverPair === key ? "scale(1.35)" : "scale(1)",
                          border: relatedToSelection ? `1px solid ${activeAlgorithm.color}88` : "1px solid transparent",
                        }}
                        aria-label={`${rowChain.name} vs ${colChain.name}`}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {hoverPair && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-xl px-4 py-3 text-sm"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--muted)" }}>
              {(() => {
                const [rId, cId] = hoverPair.split("-");
                const p = compatMap[hoverPair];
                if (!p) return null;
                const cA = allChains.find((c) => c.id === rId);
                const cB = allChains.find((c) => c.id === cId);
                return `${cA ? cA.name : rId} ↔ ${cB ? cB.name : cId}: ${p.reason}`;
              })()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
