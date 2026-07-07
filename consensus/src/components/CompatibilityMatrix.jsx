import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, Layers, CheckCircle2, AlertTriangle, ArrowRightLeft } from "lucide-react";

import compatibility from "../data/compatibility.js";
import CryptoIcon from "./CryptoIcon";
import InfoTooltip from "./InfoTooltip";

function pairKey(a, b) {
  return [a, b].sort().join("-");
}

export default function CompatibilityMatrix({ allChains, activeAlgorithm }) {
  const [hoverPair, setHoverPair] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);

  const compatMap = {};
  for (const p of compatibility) {
    compatMap[pairKey(p.chainA, p.chainB)] = p;
  }

  // Determine which pair to showcase: hover has priority, fallback to clicked selection
  const activePair = hoverPair || selectedPair;

  return (
    <section className="space-y-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-zinc-900/60">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Cross-Chain Compatibility Matrix</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">Stretching matrix of protocol interoperability</p>
        </div>
        <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-550">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-zinc-700" style={{ background: activeAlgorithm.color }} />
            Same consensus
            <InfoTooltip text="Blockchains sharing the exact same consensus parameters, offering high native compatibility and easy state sharing." size={10} />
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-zinc-800" />
            Different
            <InfoTooltip text="Blockchains utilizing different consensus mechanisms, requiring translation bridges or wrapped wrapper assets to interact." size={10} />
          </span>
        </div>
      </div>

      {/* Grid Matrix Container - Scrollable, stretched, borderless */}
      <div className="rounded-2xl border border-zinc-900/60 bg-[#0D0F14]/20 overflow-x-auto scrollbar-thin max-h-[600px]">
        <table className="w-full border-separate table-fixed min-w-[700px]" style={{ borderSpacing: 3 }}>
          <colgroup>
            {/* Sticky Label Column */}
            <col className="w-[85px]" />
            {allChains.map((c) => (
              <col key={c.id} className="w-auto" />
            ))}
          </colgroup>
          <thead>
            <tr>
              {/* Top-Left Corner Anchor */}
              <th className="sticky left-0 top-0 z-30 bg-[#0B0D12] border-r border-b border-zinc-900 p-1.5">
                <div className="text-[8px] font-bold text-zinc-650 uppercase tracking-widest text-center">
                  Matrix
                </div>
              </th>
              {allChains.map((c) => (
                <th key={c.id} className="sticky top-0 z-20 bg-[#0B0D12]/95 backdrop-blur-sm border-b border-zinc-900 py-2.5 text-center">
                  <div className="flex flex-col items-center justify-center gap-0.5">
                    <CryptoIcon symbol={c.symbol} size={15} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allChains.map((rowChain) => (
              <tr key={rowChain.id}>
                {/* Sticky Left Chain Label */}
                <th className="sticky left-0 z-20 bg-[#0B0D12]/95 backdrop-blur-sm border-r border-zinc-900 px-3 py-1.5 text-left">
                  <div className="flex items-center gap-2">
                    <CryptoIcon symbol={rowChain.symbol} size={14} />
                    <span 
                      className="font-mono text-[10px] font-bold" 
                      style={{ color: rowChain.algo === activeAlgorithm.id ? activeAlgorithm.color : "var(--text-3)" }}
                    >
                      {rowChain.symbol}
                    </span>
                  </div>
                </th>

                {/* Matrix Cell Buttons */}
                {allChains.map((colChain) => {
                  const isSelf = rowChain.id === colChain.id;
                  const p = compatMap[pairKey(rowChain.id, colChain.id)];
                  const compatible = p ? p.sameConsensus : false;
                  const relatedToSelection =
                    rowChain.algo === activeAlgorithm.id || colChain.algo === activeAlgorithm.id;
                  const key = pairKey(rowChain.id, colChain.id);

                  let bg = "rgba(30, 35, 48, 0.4)"; // dark gray fallback
                  let border = "transparent";
                  if (isSelf) bg = "rgba(42, 49, 68, 0.6)";
                  else if (compatible) {
                    bg = relatedToSelection
                      ? `${activeAlgorithm.color}`
                      : `${activeAlgorithm.color}35`;
                    border = relatedToSelection ? `${activeAlgorithm.color}50` : "transparent";
                  }

                  const isSelected = selectedPair === key;
                  const isHovered = hoverPair === key;
                  const isCurrentlyActive = isHovered || isSelected;

                  return (
                    <td key={colChain.id} className="p-0">
                      <button
                        onClick={() => setSelectedPair(prev => prev === key ? null : key)}
                        onMouseEnter={() => setHoverPair(key)}
                        onMouseLeave={() => setHoverPair((k) => (k === key ? null : k))}
                        onFocus={() => setHoverPair(key)}
                        className="w-full aspect-square rounded transition-all duration-150 cursor-pointer block"
                        style={{
                          background: bg,
                          opacity: isSelf ? 1 : (isCurrentlyActive || relatedToSelection || compatible ? 1 : 0.25),
                          transform: isCurrentlyActive ? "scale(1.2)" : "scale(1)",
                          zIndex: isCurrentlyActive ? 10 : 1,
                          border: isCurrentlyActive ? `2px solid ${activeAlgorithm.color}` : `1px solid ${border}`,
                          boxShadow: isCurrentlyActive ? `0 0 14px ${activeAlgorithm.color}40` : "none",
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

      {/* Enhanced Information Display Panel */}
      <div className="relative min-h-[140px]">
        <AnimatePresence mode="wait">
          {activePair ? (
            <motion.div
              key={activePair}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="rounded-2xl border border-zinc-900 bg-[#0D0F14]/50 p-6"
            >
              {/* Header Title with Logos */}
              {(() => {
                const [rId, cId] = activePair.split("-");
                const p = compatMap[activePair];
                if (!p) return null;
                const cA = allChains.find((c) => c.id === rId);
                const cB = allChains.find((c) => c.id === cId);
                if (!cA || !cB) return null;

                // Color code overall score
                const score = p.overallCompatibilityScore;
                const scoreColor = score >= 80 ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/8" : score >= 50 ? "text-amber-400 border-amber-500/20 bg-amber-500/8" : "text-zinc-400 border-zinc-800 bg-zinc-900/40";

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      {/* Connection Header */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-zinc-950/40 px-3 py-1.5 rounded-xl border border-zinc-900">
                          <CryptoIcon symbol={cA.symbol} size={18} />
                          <span className="text-xs font-bold text-white">{cA.name}</span>
                        </div>
                        <ArrowRightLeft size={13} className="text-zinc-550 shrink-0" />
                        <div className="flex items-center gap-1.5 bg-zinc-950/40 px-3 py-1.5 rounded-xl border border-zinc-900">
                          <CryptoIcon symbol={cB.symbol} size={18} />
                          <span className="text-xs font-bold text-white">{cB.name}</span>
                        </div>
                      </div>

                      {/* Overall Compatibility Score Pill */}
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[11px] font-bold font-mono ${scoreColor}`}>
                        <span>Interoperability Index:</span>
                        <span>{score}%</span>
                      </div>
                    </div>

                    {/* Breakdown Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-zinc-900/60 pt-4 mt-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">Consensus match</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-zinc-300">
                          <span className={p.sameConsensus ? "text-emerald-400" : "text-zinc-500"}>
                            <CheckCircle2 size={12} />
                          </span>
                          <span>{p.consensusCompatible}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">VM Compatibility</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-zinc-300">
                          <span className={p.sameVM ? "text-emerald-400" : "text-zinc-500"}>
                            <CheckCircle2 size={12} />
                          </span>
                          <span>{p.smartContractCompatible}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">Finality Sync</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-zinc-300">
                          <span className={p.finalityCompatible === "High" ? "text-emerald-400" : "text-zinc-500"}>
                            <CheckCircle2 size={12} />
                          </span>
                          <span>{p.finalityCompatible}</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">Bridge required</span>
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-semibold text-zinc-300">
                          {p.bridgeRequired ? (
                            <span className="text-amber-500 flex items-center gap-1">
                              <AlertTriangle size={12} /> Yes
                            </span>
                          ) : (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 size={12} /> No
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Rationale Paragraph */}
                    <div className="border-t border-zinc-900/60 pt-4 mt-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-550">Analysis & Rationale</span>
                      <p className="text-xs leading-relaxed text-zinc-400 mt-1 font-sans">
                        {p.reason}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            /* Matrix Placeholder state */
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-zinc-900/60 bg-[#0D0F14]/25 p-6 flex items-center gap-4 text-zinc-500 min-h-[140px]"
            >
              <div className="shrink-0 bg-zinc-900/40 p-2 rounded-xl border border-zinc-800/40">
                <HelpCircle size={20} className="text-zinc-650" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400">Analyze Interoperability</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed max-w-xl font-sans">
                  Hover over or click a grid cell in the cross-chain matrix to inspect compatibility metrics, finality sync parameters, layer matches, and bridging requirements. Click a cell to lock it in place.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
