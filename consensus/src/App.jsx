import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

import algorithms from "./data/algorithms";
import chains from "./data/chains";

import Header from "./components/Header";
import AlgorithmSelector from "./components/AlgorithmSelector";
import AlgorithmOverview from "./components/AlgorithmOverview";
import TrilemmaScorecard from "./components/TrilemmaScorecard";
import ChainMapping from "./components/ChainMapping";
import CompatibilityMatrix from "./components/CompatibilityMatrix";
import Footer from "./components/Footer";

export default function ConsensusExplorer() {
  const [activeId, setActiveId] = useState("pow");
  const prefersReduced = useReducedMotion();

  const active = useMemo(() => algorithms.find((a) => a.id === activeId), [activeId]);
  const chainsForActive = useMemo(() => chains.filter((c) => c.algo === activeId), [activeId]);

  return (
    <div
      style={{
        "--bg": "#0A0D13",
        "--surface": "#12161F",
        "--surface-2": "#1A1F2B",
        "--border": "#262C3B",
        "--text": "#E7EAF2",
        "--muted": "#8B93A7",
        "--accent": active.color,
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
      className="w-full"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .scrollbar-thin::-webkit-scrollbar { height: 8px; width: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #2A3140; border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .algo-btn:focus-visible, .chain-card:focus-visible, .cell-btn:focus-visible {
          outline: 2px solid var(--accent); outline-offset: 2px;
        }
      `}</style>

      <Header />

      <AlgorithmSelector
        algorithms={algorithms}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <main className="px-6 md:px-10 max-w-7xl mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
            transition={{ duration: 0.35 }}
          >
            <section className="grid lg:grid-cols-[1.3fr_1fr] gap-6 mb-12">
              <AlgorithmOverview algorithm={active} prefersReduced={prefersReduced} />
              <TrilemmaScorecard algorithm={active} />
            </section>

            <ChainMapping chains={chainsForActive} algorithm={active} />
          </motion.div>
        </AnimatePresence>

        <CompatibilityMatrix
          allChains={chains}
          algorithms={algorithms}
          activeAlgorithm={active}
        />
      </main>

      <Footer />
    </div>
  );
}
