import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";

import algorithms from "./data/algorithms/index.js";
import chains from "./data/chains";
import families from "./data/families";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AlgorithmOverview from "./components/AlgorithmOverview";
import HowItWorks from "./components/HowItWorks";
import TrilemmaScorecard from "./components/TrilemmaScorecard";
import ChainMapping from "./components/ChainMapping";
import CompatibilityMatrix from "./components/CompatibilityMatrix";
import LayerClassification from "./components/LayerClassification";
import LanguagesSection from "./components/LanguagesSection";
import TimelineSection from "./components/TimelineSection";
import GlossarySection from "./components/GlossarySection";
import Footer from "./components/Footer";

const familyNameToId = {
  "Proof of X": "proof-of-x",
  "BFT": "bft",
  "FBA": "fba",
  "DAG / BFT": "dag",
  "CFT": "cft",
  "Hybrid": "hybrid",
};

function loadFavorites() {
  try {
    const stored = localStorage.getItem("algo-favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch { return new Set(); }
}

export default function ConsensusExplorer() {
  const [activeId, setActiveId] = useState("pow");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFamily, setActiveFamily] = useState(null);
  const [favorites, setFavorites] = useState(loadFavorites);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    localStorage.setItem("algo-favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const active = useMemo(() => algorithms.find((a) => a.id === activeId), [activeId]);
  const chainsForActive = useMemo(() => chains.filter((c) => c.algo === activeId), [activeId]);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const familyAlgorithms = useMemo(() => {
    const map = {};
    for (const a of algorithms) {
      const familyId = familyNameToId[a.family] || a.family;
      if (!map[familyId]) map[familyId] = [];
      map[familyId].push(a);
    }
    return map;
  }, []);

  const familyData = useMemo(() => {
    const map = {};
    for (const f of families) map[f.id] = f;
    return map;
  }, []);

  const handleSelect = useCallback((id) => {
    setActiveId(id);
    setSidebarOpen(false);
  }, []);

  const filteredAlgorithms = useMemo(() => {
    if (!searchQuery && !activeFamily) return algorithms;
    return algorithms.filter((a) => {
      if (activeFamily && (familyNameToId[a.family] || a.family) !== activeFamily) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.shortName.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchQuery, activeFamily]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

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
        fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
      }}
      className="min-h-screen w-full flex"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .algo-btn:focus-visible, .chain-card:focus-visible, .cell-btn:focus-visible, .sidebar-item:focus-visible {
          outline: 2px solid var(--accent); outline-offset: 2px;
        }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #2A3140; border-radius: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={closeSidebar}
        algorithms={filteredAlgorithms}
        allAlgorithms={algorithms}
        activeId={activeId}
        onSelect={handleSelect}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFamily={activeFamily}
        onFamilyChange={setActiveFamily}
        families={families}
        familyNameToId={familyNameToId}
        familyAlgorithms={familyAlgorithms}
        familyData={familyData}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-20 lg:hidden">
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "rgba(10, 13, 19, 0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-lg transition-colors"
              style={{ color: "var(--muted)" }}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="font-display text-sm font-semibold" style={{ color: "var(--accent)" }}>
              {active.shortName}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 md:px-8 lg:px-10 pb-16 max-w-6xl mx-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero */}
              <Header algorithm={active} />

              {/* Overview */}
              <section id="overview" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 rounded-full" style={{ background: active.color }} />
                  <h2 className="section-heading">Overview</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-mono" style={{ background: `${active.color}15`, color: active.color }}>
                    {active.shortName}
                  </span>
                </div>
                <AlgorithmOverview algorithm={active} prefersReduced={prefersReduced} />
              </section>

              {/* How It Works */}
              <section id="how-it-works" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 rounded-full" style={{ background: active.color }} />
                  <h2 className="section-heading">How It Works</h2>
                </div>
                <HowItWorks algorithm={active} prefersReduced={prefersReduced} />
              </section>

              {/* Trilemma */}
              <section id="trilemma" className="mb-16 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1 h-6 rounded-full" style={{ background: active.color }} />
                  <h2 className="section-heading">Trilemma Scorecard</h2>
                </div>
                <TrilemmaScorecard algorithm={active} />
              </section>

              {/* Blockchain Mapping */}
              <section id="mapping" className="mb-16 scroll-mt-24">
                <ChainMapping chains={chainsForActive} algorithm={active} />
              </section>

              {/* Layer Classification */}
              {chainsForActive.length > 0 && (
                <section id="layers" className="mb-16 scroll-mt-24">
                  <LayerClassification chains={chainsForActive} algorithm={active} />
                </section>
              )}

              {/* Languages */}
              {chainsForActive.length > 0 && (
                <section id="languages" className="mb-16 scroll-mt-24">
                  <LanguagesSection chains={chainsForActive} algorithm={active} />
                </section>
              )}

              {/* Compatibility */}
              <section id="compatibility" className="mb-16 scroll-mt-24">
                <CompatibilityMatrix allChains={chains} activeAlgorithm={active} />
              </section>
            </motion.div>
          </AnimatePresence>

          {/* Timeline — static, not algorithm-dependent */}
          <section id="timeline" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-6 rounded-full" style={{ background: "#8B93FF" }} />
              <h2 className="section-heading">Historical Timeline</h2>
            </div>
            <TimelineSection />
          </section>

          {/* Glossary — static */}
          <section id="glossary" className="mb-16 scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1 h-6 rounded-full" style={{ background: "#8B93FF" }} />
              <h2 className="section-heading">Glossary</h2>
            </div>
            <GlossarySection />
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
