import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import compatibility from "../data/compatibility.js";
import CryptoIcon from "./CryptoIcon";

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
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h3 className="text-base font-semibold tracking-tight">Cross-Chain Matrix</h3>
        <div className="flex items-center gap-3 text-xs" style={{ color: "var(--text-2)" }}>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: activeAlgorithm.color }} />
            Same consensus
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded" style={{ background: "var(--surface-2)" }} />
            Different
          </span>
        </div>
      </div>

      <div
        className="rounded-xl overflow-auto scrollbar-thin"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", maxHeight: 520 }}
      >
        <table className="border-separate" style={{ borderSpacing: 2 }}>
          <thead>
            <tr>
              <th className="sticky left-0 top-0 z-10" style={{ background: "var(--surface)" }}>
                <div className="w-8" />
              </th>
              {allChains.map((c) => (
                <th key={c.id} className="sticky top-0 z-10" style={{ background: "var(--surface)" }}>
                  <div className="flex items-center justify-center py-1.5">
                    <CryptoIcon symbol={c.symbol} size={16} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allChains.map((rowChain) => (
              <tr key={rowChain.id}>
                <th className="sticky left-0 z-10 pr-2" style={{ background: "var(--surface)" }}>
                  <div className="flex items-center gap-1.5 py-1">
                    <CryptoIcon symbol={rowChain.symbol} size={14} />
                    <span className="font-mono text-[9px]" style={{ color: rowChain.algo === activeAlgorithm.id ? activeAlgorithm.color : "var(--text-3)" }}>
                      {rowChain.symbol}
                    </span>
                  </div>
                </th>
                {allChains.map((colChain) => {
                  const isSelf = rowChain.id === colChain.id;
                  const p = compatMap[pairKey(rowChain.id, colChain.id)];
                  const compatible = p ? p.sameConsensus : false;
                  const relatedToSelection =
                    rowChain.algo === activeAlgorithm.id || colChain.algo === activeAlgorithm.id;
                  const key = pairKey(rowChain.id, colChain.id);

                  let bg = "var(--surface-2)";
                  let border = "transparent";
                  if (isSelf) bg = "var(--border)";
                  else if (compatible) {
                    bg = relatedToSelection
                      ? `${activeAlgorithm.color}`
                      : `${activeAlgorithm.color}55`;
                    border = relatedToSelection ? `${activeAlgorithm.color}88` : "transparent";
                  }

                  return (
                    <td key={colChain.id} className="p-0">
                      <button
                        className="w-5 h-5 rounded-sm transition-all duration-150"
                        onMouseEnter={() => setHoverPair(key)}
                        onMouseLeave={() => setHoverPair((k) => (k === key ? null : k))}
                        onFocus={() => setHoverPair(key)}
                        style={{
                          background: bg,
                          opacity: isSelf ? 1 : (relatedToSelection || compatible ? 1 : 0.3),
                          transform: hoverPair === key ? "scale(1.3)" : "scale(1)",
                          border: hoverPair === key ? `1px solid ${activeAlgorithm.color}` : `1px solid ${border}`,
                          boxShadow: hoverPair === key ? `0 0 12px ${activeAlgorithm.color}44` : "none",
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
            transition={{ duration: 0.15 }}
            className="mt-3 rounded-lg px-4 py-3 text-sm"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <span style={{ color: "var(--text-2)" }}>
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
