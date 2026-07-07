import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldAlert, Award, Grid } from "lucide-react";

import algorithms from "./data/algorithms/index.js";
import chains from "./data/chains";
import familiesData from "./data/families";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SearchFilterCard from "./components/SearchFilterCard";
import IconByName from "./components/IconByName";
import AlgorithmOverview from "./components/AlgorithmOverview";
import TrilemmaScorecard from "./components/TrilemmaScorecard";
import HowItWorks from "./components/HowItWorks";
import ChainMapping from "./components/ChainMapping";
import LanguagesSection from "./components/LanguagesSection";
import LayerClassification from "./components/LayerClassification";
import CompatibilityMatrix from "./components/CompatibilityMatrix";
import GlossarySection from "./components/GlossarySection";
import TimelineSection from "./components/TimelineSection";
import Footer from "./components/Footer";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "How It Works" },
  { id: "chains", label: "Chains" },
  { id: "compatibility", label: "Compatibility" },
  { id: "reference", label: "Reference" },
];

// Simple, robust SPA routing hook
function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return [path, navigate];
}

export default function ConsensusExplorer() {
  const [currentPath, navigate] = usePath();

  const [activeId, setActiveId] = useState("pow");
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => new Set());
  
  const [advancedFilters, setAdvancedFilters] = useState({
    permission: "all",
    finality: "all",
  });

  const handleAdvancedFilterChange = (filterKey, value) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
  };

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Filter algorithms dynamically
  const filteredAlgorithms = useMemo(() => {
    let result = algorithms;

    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.shortName.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.family.toLowerCase().includes(q)
      );
    }

    // 2. Primary Filter Pills
    if (activeFilter !== "all") {
      if (activeFilter === "pow") {
        result = result.filter(
          (a) =>
            a.id === "pow" ||
            a.id === "proofOfCapacity" ||
            a.id === "proofOfBurn" ||
            a.id === "proofOfActivity" ||
            a.name.toLowerCase().includes("work")
        );
      } else if (activeFilter === "pos") {
        result = result.filter(
          (a) =>
            a.id === "pos" ||
            a.id === "dpos" ||
            a.id === "npos" ||
            a.id === "bpos" ||
            a.id === "ouroboros" ||
            a.name.toLowerCase().includes("stake")
        );
      } else if (activeFilter === "dag") {
        result = result.filter(
          (a) =>
            a.family.toLowerCase().includes("dag") ||
            a.id === "avalanche" ||
            a.id === "snowman" ||
            a.id === "snowball" ||
            a.id === "poh"
        );
      } else if (activeFilter === "bft") {
        result = result.filter(
          (a) =>
            a.family.toLowerCase().includes("bft") ||
            a.id === "pbft" ||
            a.id === "dbft" ||
            a.id === "tendermint" ||
            a.id === "ibft" ||
            a.id === "hotstuff"
        );
      } else if (activeFilter === "l1l2") {
        // Algorithms with distinct L1 and L2 chains represented in data
        result = result.filter((a) => a.id === "pow" || a.id === "pos");
      }
    }

    // 3. Advanced Filters
    if (advancedFilters.permission !== "all") {
      result = result.filter(
        (a) =>
          a.permissionType &&
          a.permissionType.toLowerCase() === advancedFilters.permission.toLowerCase()
      );
    }

    if (advancedFilters.finality !== "all") {
      result = result.filter(
        (a) =>
          a.finalityType &&
          a.finalityType.toLowerCase().includes(advancedFilters.finality.toLowerCase())
      );
    }

    // 4. Favorites Toggle
    if (showFavoritesOnly) {
      result = result.filter((a) => favorites.has(a.id));
    }

    return result;
  }, [searchQuery, activeFilter, advancedFilters, showFavoritesOnly, favorites]);

  // Adjust active algorithm to remain inside the filtered set if the old active selection is filtered out
  useEffect(() => {
    if (filteredAlgorithms.length > 0) {
      const activeExists = filteredAlgorithms.some((a) => a.id === activeId);
      if (!activeExists) {
        setActiveId(filteredAlgorithms[0].id);
      }
    }
  }, [filteredAlgorithms, activeId]);

  const active = useMemo(() => algorithms.find((a) => a.id === activeId) || algorithms[0], [activeId]);
  const chainsForActive = useMemo(() => chains.filter((c) => c.algo === active.id), [active.id]);

  // Handle route matching (support root '/' vs '/explorer')
  const isExplorer = currentPath === "/explorer";

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* CSS vars per active algorithm */}
      <style>{`
        :root { --accent: ${active ? active.color : "#10B981"}; }
      `}</style>

      {/* Top Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Page Routing Switch */}
      <div className="flex-1 flex flex-col">
        {!isExplorer ? (
          // LANDING PAGE PATH: '/'
          <HeroSection navigate={navigate} />
        ) : (
          // EXPLORER PATH: '/explorer'
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col">
            
            {/* Top Search & Filter Card from Image */}
            <SearchFilterCard
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              advancedFilters={advancedFilters}
              onAdvancedFilterChange={handleAdvancedFilterChange}
            />

            {/* Split Screen Layout */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
              
              {/* Desktop Left Column: Algorithm List (Hidden on Mobile) */}
              <aside className="hidden lg:flex flex-col bg-[#0D0F14]/75 border border-zinc-800/80 rounded-2xl p-4 sticky top-24 max-h-[calc(100vh-10rem)] overflow-hidden">
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-zinc-800/60">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Algorithms ({filteredAlgorithms.length})
                  </span>
                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`p-1 rounded-md transition-all cursor-pointer ${
                      showFavoritesOnly 
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                        : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                    }`}
                    title={showFavoritesOnly ? "Show all" : "Show favorites"}
                  >
                    <Star size={13} fill={showFavoritesOnly ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Vertical Scrollable List */}
                <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin pr-1">
                  {filteredAlgorithms.map((a) => {
                    const isActive = a.id === active.id;
                    const isFav = favorites.has(a.id);
                    return (
                      <div
                        key={a.id}
                        onClick={() => setActiveId(a.id)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 border-transparent bg-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
                        }`}
                        style={{
                          background: isActive ? `${a.color}12` : "",
                          borderColor: isActive ? `${a.color}35` : "",
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Indicator Dot */}
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: a.color }}
                          />
                          <span
                            className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-zinc-900/60"
                            style={{ color: isActive ? a.color : "var(--text-3)" }}
                          >
                            <IconByName name={a.id} size={10} />
                          </span>
                          <span className="truncate">{a.shortName}</span>
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(a.id);
                          }}
                          className={`p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
                            isFav ? "opacity-100 text-amber-500" : "text-zinc-600 hover:text-zinc-400"
                          }`}
                        >
                          <Star size={11} fill={isFav ? "currentColor" : "none"} />
                        </button>
                      </div>
                    );
                  })}

                  {filteredAlgorithms.length === 0 && (
                    <div className="text-center py-8 text-zinc-500 text-xs">
                      No matching algorithms
                    </div>
                  )}
                </div>
              </aside>

              {/* Mobile Horizontal Selector (Hidden on Desktop) */}
              <div className="block lg:hidden w-full overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Select Algorithm ({filteredAlgorithms.length})
                  </span>
                  <button
                    onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                      showFavoritesOnly 
                        ? "bg-amber-500/10 text-amber-500" 
                        : "text-zinc-500"
                    }`}
                  >
                    <Star size={10} fill={showFavoritesOnly ? "currentColor" : "none"} />
                    <span>Favorites</span>
                  </button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-none whitespace-nowrap">
                  {filteredAlgorithms.map((a) => {
                    const isActive = a.id === active.id;
                    return (
                      <button
                        key={a.id}
                        onClick={() => setActiveId(a.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "text-white"
                            : "text-zinc-400 border-zinc-900 bg-zinc-950/40 hover:text-zinc-200"
                        }`}
                        style={{
                          background: isActive ? `${a.color}15` : "",
                          borderColor: isActive ? `${a.color}40` : "",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                        <span>{a.shortName}</span>
                      </button>
                    );
                  })}
                  {filteredAlgorithms.length === 0 && (
                    <span className="text-xs text-zinc-500">No matching algorithms</span>
                  )}
                </div>
              </div>

              {/* Workspace Right Column: Detail Content */}
              <main className="flex-1 min-w-0 flex flex-col">
                {filteredAlgorithms.length === 0 ? (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center text-center p-12 bg-[#0D0F14]/75 border border-zinc-800/80 rounded-2xl min-h-[400px]">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/60 border border-zinc-800 flex items-center justify-center mb-4 text-zinc-500">
                      <Grid size={20} />
                    </div>
                    <h3 className="text-base font-bold text-white">No Matching Algorithms</h3>
                    <p className="text-xs text-zinc-500 max-w-sm mt-2">
                      No consensus protocols matched your current filter criteria. Try resetting your search query or filters.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("all");
                        setShowFavoritesOnly(false);
                        setAdvancedFilters({ permission: "all", finality: "all" });
                      }}
                      className="mt-5 px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold rounded-lg text-white transition-colors cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  /* Active Algorithm Details */
                  <div className="space-y-6">
                    {/* Tab Navigation */}
                    <nav className="border-b border-zinc-800/60 pb-px">
                      <div className="flex gap-2 overflow-x-auto scrollbar-none">
                        {TABS.map((tab) => {
                          const isActive = tab.id === activeTab;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveTab(tab.id)}
                              className="px-3.5 py-2.5 text-xs font-semibold transition-all relative whitespace-nowrap cursor-pointer hover:text-white"
                              style={{
                                color: isActive ? "var(--text)" : "var(--text-3)",
                              }}
                            >
                              {tab.label}
                              {isActive && (
                                <motion.div
                                  layoutId="activeTabUnderline"
                                  className="absolute bottom-0 left-0 right-0 h-0.5"
                                  style={{ backgroundColor: "var(--accent)" }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </nav>

                    {/* Tab Content */}
                    <div className="bg-[#0D0F14]/40 border border-zinc-800/50 rounded-2xl p-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${active.id}-${activeTab}`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                        >
                          {activeTab === "overview" && (
                            <div className="space-y-8">
                              <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
                                <AlgorithmOverview algorithm={active} />
                                <TrilemmaScorecard algorithm={active} />
                              </div>
                              <ChainMapping chains={chainsForActive} algorithm={active} />
                              <LanguagesSection chains={chainsForActive} algorithm={active} />
                              <LayerClassification chains={chainsForActive} algorithm={active} />
                            </div>
                          )}

                          {activeTab === "details" && (
                            <div className="max-w-3xl">
                              <HowItWorks algorithm={active} />
                            </div>
                          )}

                          {activeTab === "chains" && (
                            <div className="space-y-8">
                              <ChainMapping chains={chainsForActive} algorithm={active} />
                              <LanguagesSection chains={chainsForActive} algorithm={active} />
                              <LayerClassification chains={chainsForActive} algorithm={active} />
                            </div>
                          )}

                          {activeTab === "compatibility" && (
                            <CompatibilityMatrix allChains={chains} activeAlgorithm={active} />
                          )}

                          {activeTab === "reference" && (
                            <div className="space-y-10 max-w-3xl">
                              <GlossarySection />
                              <TimelineSection />
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </main>

            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
