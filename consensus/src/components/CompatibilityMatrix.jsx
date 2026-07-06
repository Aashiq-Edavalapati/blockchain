import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Unlink } from "lucide-react";
import { pairNote } from "../utils/helpers";

export default function CompatibilityMatrix({ allChains, algorithms, activeAlgorithm }) {
  const [hoverCell, setHoverCell] = useState(null);

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
        Rows and columns for the selected algorithm ({activeAlgorithm.short}) are highlighted. Hover any cell for a
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
                  const compatible = rowChain.algo === colChain.algo;
                  const algo = algorithms.find((a) => a.id === rowChain.algo);
                  const isSelf = rowChain.id === colChain.id;
                  const relatedToSelection =
                    rowChain.algo === activeAlgorithm.id || colChain.algo === activeAlgorithm.id;
                  const key = `${rowChain.id}-${colChain.id}`;
                  return (
                    <td key={colChain.id} className="p-0">
                      <button
                        className="cell-btn w-6 h-6 rounded-md transition-transform"
                        onMouseEnter={() => setHoverCell(key)}
                        onMouseLeave={() => setHoverCell((k) => (k === key ? null : k))}
                        onFocus={() => setHoverCell(key)}
                        style={{
                          background: isSelf
                            ? "var(--border)"
                            : compatible
                            ? algo.color + (relatedToSelection ? "cc" : "55")
                            : "var(--surface-2)",
                          opacity: relatedToSelection || compatible ? 1 : 0.55,
                          transform: hoverCell === key ? "scale(1.35)" : "scale(1)",
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
        {hoverCell && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
            className="mt-3 rounded-xl px-4 py-3 text-sm"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            {(() => {
              const [rId, cId] = hoverCell.split("-");
              const r = allChains.find((c) => c.id === rId);
              const cc = allChains.find((c) => c.id === cId);
              if (!r || !cc) return null;
              return <span style={{ color: "var(--muted)" }}>{pairNote(r, cc, algorithms)}</span>;
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
